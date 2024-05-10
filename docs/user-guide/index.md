# User Guide

## General

On the front page you can find some background information on our database and a randomly created cancer cell line CNV frequency plot where amplifications are shown in yellow and deletions in blue. The left panel shows different query options.
![cancercelllines front page](front.png)
**Cell Line Listings** - find all available cancer cell lines represented hierarchically. Search box allows for the query of cell line of interest. Returns info on cell line origins, hierarchies, variants and cell line gene information extraction.
**Search Cell Lines** - general search box for variant queries, cell line specific queries and queries by cancer type.
**CNV profiles by Cancer Type** - get cancer cell line CNV profiles for cancer type of interest. Get hierarchical cancer types by NCIT or ICDO classifications.

## Cell Lines Listing

### Search Form

![Cell Line Listing page](cl-listing-search.png)
On “Cell Lines Listing” page, available cancer cell lines are listed and child terms can be expanded by clicking on the “>”. You can also search for a cell line either by name or cellosaurus ID in the search box. Numbers indicate available biosamples and CNV profiles available for cell line of interest. By clicking on cell line you will be directed to cell line results page.

### Cell Line Page

![Cell line page](cl-page.png)

Cell line results page first gives information on the cell line. First, derived and parental cell lines are listed. Then information on the donor individual is listed including diagnosis, sex and age. Genomic ancestry is also available for a selection of cell lines. Below is a section on sample numbers and further search options. A link to Cellosaurus cell line knowledge resource is also provided for more information.

![Table of annotated SNVs](annotated-vars.png)
The following section shows annotated single nucleotide variants for the cell line. Variants can be ordered by gene, for example, by clicking “Gene” on the table header. Variants shown in this section include derived variants from parental cell lines.

![CNV frequency plot](cnv-plot.png)
Subset CNV frequencies are visualized in the next section. Links below frequency plot direct to downloading the plot in SVG format as well as to the search page.

![Table of associated literature](lit-table.png)
The last section of the cell line results page shows literature derived gene information on the cell lines. Click on the gene name to visualize it on the frequency plot. Clicking on the article title redirects you to the article page on PubMed. Abstract of the paper will be expanded upon left-click.

![Genes of interest shown on CNV profile](annotated_genes.png)

## Search Cell Lines

You can also search for individual cell line by the name or ID or search for cell lines that match the diagnosis of interest (eg NCIT code) or search for all cell lines that harbour a specific variant. 

![Search form](search-form.png)


All search form fields:

* The top row of the search fields offers some example queries, for both cell lines and positional queries.
* You can use "Gene Spans" and "Cytobands" buttons to limit your results to a range of a gene of interest or a specific cytoband.
* Default dataset is Cancer Cell Lines Collection but Progenetix collection is also available to enable queries with tumor samples
* Gene Symbol - search for a variant in a gene
* Query by Position - show fields to enable search by position
* Chromosome - enter chromosome of interest. Refseq IDs are also accepted.
* Variant Type - specify variant type by EFO term. This field can be used to receive available SNVs.
* Start or Position - start of sequence variation of 1-based genomic positions
* End - end of sequence variation of 1-based genomic positions
* Minimum/Maximum variant length - for queries with pre-defined variant lengths
* Reference/Alternate Base(s) - enter reference and altered nucleotide bases
* Cell Line IDs/Names - this field can be used to query cell lines by their IDs. Cellosaurus IDs or cell line names (Cellosaurus nomenclature) are accepted as input for cell lines.
* Cancer Classification(s) - use NCIT or ICDO disease codes to search for cell lines of the diagnostic code.
* Genotypic Sex - search for male or female cell line samples.
* Filtering options - additional filters to limit the number of search result, define filter logic and include child terms.
* Filters - option to add additional free comma separated filters e.g. PMID, CVCL etc.
* Filter logic - and/or
* Include Child Terms - includes available child terms or only shows exact matches. Can be applied for cell lines and diagnostic codes as well.
* Response Limit/Page Size - default is 1000, can be increased or decreased
* Skip Pages - select number of pages to be skipped
* City - search samples by the annotated city

The top panel includes 5 other short query types: Cell Line Search, CNV query, Genomic Range, Gene ID and Sequence

### Search Results: Cell Line Query

Here are the search results for an example query listed in the search form - K-562 cell line. All data in our database is uses GRCh38 assembly version. Used filters, in this case Cellosaurus ID for K-562 are shown on top. Cellz - an internal short name for the cancer cell lines dataset. Dataset responses can be viewed in a JSON format. In the results tab, the frequency plot for query result is shown. On the last page, you can find a table of matched subsets and sample numbers. These data can also be downloaded in TSV or JSON format.

![results_search.png](results_search.png)

### Biosamples

Clicking on “Biosample ID” on the Biosamples tab will lead to the sample page. There info about the cell line origin is shown - same as in Cell Line Page. Additional reference for the sample are provided and CNV plot of the sample is shown (when available).

![Sample details](sample-details.png)

Visualization options land on a separate page with advanced options for data visualization. In addition to frequency plot, a sample plot with all clustered individual plots is shown.

![Visualization options](visual.png)

Biosamples tab lists samples for this query. Associated diagnostic codes are also shown. Identifiers column shows other known sample identifiers such as GEO IDs or PMID.

![Biosamples table](img.png)

We have geographical info about where the sample was processed. This data is geographically represented. Click "Geographical Map" to view it. This info is only available for CNV samples.

![Map of biosamples](map.png)

### Search Results: SNV query

To access our SNV data, cell line on interest can be queried in "Search Cell Lines" like for CNV samples but additional field needs to be entered under Query by Position -> Variant Type -> SO:0001059 (any sequence alteration - SNV, INDEL…). This yields in all available SNVs for the cell line of interest. For example, search results for PC-9 cell line SNVs (Filtering Options -> only match exact terms) result in:

Variants are listed under “Variants” tab. Here, a small part of matched variants is listed. The results can be sorted by Digest, Gene, Pathogenicity or Variant Effect by clicking on the column name. Click on the variant ID in blue for more information on the variant.

![Variants table](img_3.png)

The example below shows available data for a variants collected from CCLE mutation set.

![Variant details CCLE](img_4.png)

Here is an example for a matched variant in ClinVar dataset:

![Variant details ClinVar](img_5.png)

## CNV Profiles by Cancer Type

Like in Cell Line Listings, diagnostic codes are organized hierarchically. We provide NCIT and ICDO diagnostic codes for cancer cell lines. Number of biosamples and CNV profiles per NCI term are indicated.  Clicking on available samples will lead to search form that can be used as described above.