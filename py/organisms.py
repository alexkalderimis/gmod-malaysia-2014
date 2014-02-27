import intermine.webservice

flymine = intermine.webservice.Service("http://www.flymine.org/query")

for o in flymine.model.Organism:
    print o.name, o.taxonId
