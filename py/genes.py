import intermine.webservice

flymine = intermine.webservice.Service("http://www.flymine.org/query")

fly_genes = flymine.model.Gene.where('organism.taxonId', '=', 7227)

print "There are %s fly genes" % fly_genes.count()

