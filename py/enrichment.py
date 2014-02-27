import intermine.webservice

flymine = intermine.webservice.Service("http://www.flymine.org/query")

genes = flymine.get_list("PL FlyAtlas_ovary_top")
for item in genes.calculate_enrichment("go_enrichment_for_gene"):
    print item.identifier, item.p_value

for w in flymine.widgets.values():
    print('{name} - {description}'.format(**w))

