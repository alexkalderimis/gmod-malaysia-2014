import intermine.webservice

flymine = intermine.webservice.Service("http://www.flymine.org/query")

for l in flymine.get_all_lists():
    print l.name, l.list_type, l.size, l.status
