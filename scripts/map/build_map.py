import json, math, re, glob, sys
from shapely.geometry import shape, box, Point, Polygon, LineString
from shapely.ops import unary_union
W0,S0,E0,N0 = 138.30,-35.40,138.86,-34.775
fc=json.load(open('sa.geojson')); bb=box(W0,S0,E0,N0)
reg=Polygon([(138.40,-34.80),(138.52,-34.80),(138.535,-34.865),(138.70,-34.865),(138.72,-34.93),(138.84,-34.97),(138.84,-35.06),(138.70,-35.07),(138.58,-35.08),(138.565,-35.15),(138.53,-35.25),(138.52,-35.365),(138.40,-35.365)])
land=[];sel=[];by={}
for f in fc['features']:
    g=shape(f['geometry'])
    if not g.intersects(bb.buffer(0.05)): continue
    if not g.is_valid: g=g.buffer(0)
    land.append(g)
    if g.area<0.004:
        by.setdefault(f['properties']['sa_local_2'],[]).append(g)
        if reg.contains(g.representative_point()): sel.append(g)
land=unary_union(land).buffer(0.004).buffer(-0.004)
land=max(land.geoms,key=lambda g:g.area) if hasattr(land,'geoms') else land
land=Polygon(land.exterior).intersection(bb)
zone=unary_union(sel).buffer(0.012).buffer(-0.012).buffer(-0.008).buffer(0.008)
zone=max(zone.geoms,key=lambda g:g.area) if hasattr(zone,'geoms') else zone
def chaikin(c,n=3):
    for _ in range(n):
        o=[]
        for a,b in zip(c,c[1:]+c[:1]):
            o+=[(0.75*a[0]+0.25*b[0],0.75*a[1]+0.25*b[1]),(0.25*a[0]+0.75*b[0],0.25*a[1]+0.75*b[1])]
        c=o
    return c
zc=list(Polygon(zone.exterior).simplify(0.004).exterior.coords)[:-1]
zone=Polygon(chaikin(zc,3)).buffer(0.004).intersection(land)   # push past the coast, then clip to it
zone=max(zone.geoms,key=lambda g:g.area) if hasattr(zone,'geoms') else zone
k=math.cos(math.radians(-35.1)); VW=420; sc=VW/((E0-W0)*k); VH=round((N0-S0)*sc)
P=lambda x,y:((x-W0)*k*sc,(N0-y)*sc)
def d(coords,close=True):
    pts=[P(*c) for c in coords]; out=[]; last=None
    for x,y in pts:
        s='%d %d'%(round(x),round(y))
        if s!=last: out.append(s); last=s
    return 'M'+'L'.join(out)+('z' if close else '')
landp=d(land.simplify(0.0015).exterior.coords)
zonep=d(zone.simplify(0.0008).exterior.coords)
# coast line = land boundary that is not on the frame
edge=land.simplify(0.0015).exterior.difference(bb.exterior.buffer(0.0005))
coast=max(edge.geoms,key=lambda g:g.length) if hasattr(edge,'geoms') else edge
coastp=d(coast.coords,False)
def pt(n):
    if n=="ADELAIDE": return P(138.6007,-34.9285)
    c=unary_union(by[n]).representative_point(); return P(c.x,c.y)
def west(n):
    u=unary_union(by[n]); return P(u.bounds[0],u.representative_point().y)
DOTS=[("prospect","PROSPECT","Prospect",9,5,"start"),("cbd","ADELAIDE","City",0,22,"middle"),("norwood","NORWOOD","Norwood",14,-11,"middle"),("glenelg","GLENELG","Glenelg",-12,6,"end"),("brighton","BRIGHTON","Brighton",-12,6,"end"),("stirling","STIRLING","Stirling",0,24,"middle")]
def frag(here=None):
    o=[f'<svg viewBox="0 0 {VW} {VH}" role="img" aria-labelledby="map-t map-d">','<title id="map-t">Where Aurea works</title>',
       '<desc id="map-d">A map of Adelaide between the gulf and the Hills. One shaded area runs down the coast from Largs Bay to Sellicks Beach and inland from Prospect, the city and Norwood through Marion and Mitcham to Stirling and Hahndorf in the Hills.</desc>',
       f'<rect class="map__sea" width="{VW}" height="{VH}"/>',f'<path class="map__land" d="{landp}"/>',f'<path class="map__zone" d="{zonep}"/>',f'<path class="map__coast" d="{coastp}"/>','<g class="map__dots">']
    names=[]
    for a,n,t,dx,dy,anc in DOTS:
        x,y=pt(n)
        if a in("glenelg","brighton"): wx,_=west(n); x=wx+7
        o.append(f'<circle class="map__dot{" is-here" if a==here else ""}" data-area="{a}" cx="{x:.0f}" cy="{y:.0f}" r="5.5"/>')
        sea = a in("glenelg","brighton")
        names.append(f'<text{" class=\"map__name--sea\"" if sea else ""} x="{x+dx:.0f}" y="{y+dy:.0f}"{"" if anc=="start" else f" text-anchor=\"{anc}\""}>{t}</text>')
    o.append('</g>'); o.append('<g class="map__name" aria-hidden="true">'); o+=names; o.append('</g>')
    o.append('<g class="map__ctx" aria-hidden="true">')
    for t,n in [("Largs Bay","LARGS BAY"),("Henley Beach","HENLEY BEACH"),("Hallett Cove","HALLETT COVE"),("Port Noarlunga","PORT NOARLUNGA"),("Aldinga","ALDINGA BEACH"),("Sellicks Beach","SELLICKS BEACH")]:
        x,y=west(n); o.append(f'<text x="{x-8:.0f}" y="{y+5:.0f}" text-anchor="end">{t}</text>')
    for t,n,dx,dy in [("Marion","MARION",16,6),("Mitcham","MITCHAM",0,5),("Hahndorf","HAHNDORF",-4,-10)]:
        x,y=pt(n); o.append(f'<text class="map__in" x="{x+dx:.0f}" y="{y+dy:.0f}" text-anchor="middle">{t}</text>')
    x,y=P(138.315,-35.215); o.append(f'<text class="map__gulf" x="{x:.0f}" y="{y:.0f}">Gulf St Vincent</text>')
    o.append('</g>'); o.append('</svg>')
    return o
if __name__=="__main__":
    root=sys.argv[1]; tot=0
    for f in glob.glob(root+'/next/*.html')+glob.glob(root+'/next/areas/*.html'):
        s=open(f).read()
        m=re.search(r'( *)<svg viewBox="0 0 420 \d+" role="img" aria-labelledby="map-t map-d">.*?</svg>', s, re.S)
        if not m: continue
        here=re.search(r'class="map__dot is-here" data-area="(\w+)"', m.group(0))
        ind=m.group(1)
        new=('\n'+ind+'  ').join(frag(here.group(1) if here else None)); new=ind+new.replace('\n'+ind+'  </svg>','\n'+ind+'</svg>')
        s=s[:m.start()]+new+s[m.end():]
        s=s.replace('<figcaption>A drawing, not to scale. Each dot has its own page.</figcaption>','<figcaption>Our service area, from Largs Bay to Sellicks Beach and back to the Hills. Each dot has its own page.</figcaption>')
        open(f,'w').write(s); tot+=1; print(f.split('next/')[1], here.group(1) if here else '-', len(new))
    print('files',tot,'viewBox',VW,VH)
