import React from "react"
import { Layout } from "../components/Layout"
import Panel from "../components/Panel"
import { SubsetHistogram } from "../components/SVGloaders"
import { Admonition } from "../components/Admonitions"
import { sample } from "lodash"
import { SITE_DEFAULTS, tryFetch } from "../hooks/api"
import { ExternalLink, InternalLink } from "../components/helpersShared/linkHelpers"

// const searchLink = 'Use case: Local CNV Frequencies <a href="/biosamples/">{↗}</a>'+

export default function Index({
  subsetsResponse,
  ncitCount,
  cellosaurusCount
}) {
  const imgHere = {
    float: "right",
    width: "250px",
    border: "0px",
    margin: "-65px 0px 0px 0px"
  }

  const randomSubset = sample(
    subsetsResponse.response.results.filter((s) => s.cnvAnalyses > 1)
  )

  console.log(randomSubset)

  return (
    <Layout title="Cancer Cell Lines" headline="Cancer Cell Line Genomics">
        <img src={"/img/progenetix_cellosaurus.png"} style={imgHere} />
        <Panel heading="" className="content">
        
        <p>
          The <i>cancercelllines.org</i> genomic information resource contains genome
          profiling data, somatic mutation information and associated metadata for
          thousands of human cancer cell lines. It has its origins in genomic copy
          number variation (CNV) profiling data of cell lines originally collected
          as part of the more than 100’000 individual datasets in the{" "}
          <InternalLink
            href="http://progenetix.org"
            label="Progenetix"
          />{" "}
          oncogenomic resource. However, by providing genome mapped, annotated 
          data for many types of genomic mutations, together with CNV profiles for a subset
          of the overall more than 16&lsquo;000 cell lines, <i>cancercelllines.org</i> provides
          a unique entry point for the comparative analysis of genomic variants in
          cell lines as well as for the exploration of related publications.
          <SubsetHistogram datasetIds={SITE_DEFAULTS.DATASETID} id={randomSubset.id} />

        </p>

{/*        <SubsetHistogram
          datasetIds={SITE_DEFAULTS.DATASETID}
          id={randomSubset.id}
          title="Cell Line Data CNV Frequency Plot"
          description={`The CNV histogram above represents CNV data from a
          randomly selected set of samples - either instances of a common cell 
          line or with a shared diagnosis. In this example the frequencies of 
          regional gains and losses in ${randomSubset.cnvAnalyses}${" "}
          samples from ${randomSubset.id} (${randomSubset.label}) are on display.`}
        />
*/}
        <p>
          In <i>cancercelllines.org</i> genomic variation data collected from a
          variaty of external resources and from original data (re-) analyses has
          been mapped to GRCh38 genome coordinates and is queryable using the{" "}
          <ExternalLink
            href="http://docs.genomebeacons.org"
            label="Beacon v2 API"
          />. The resource contains data of{" "}
          <span className="span-red">{cellosaurusCount}</span>{" "}individual cancer cell lines from{" "}
          <span className="span-red">{ncitCount}</span>{" "}different cancer
          types (NCIt neoplasm classification).
        </p>
        <p>
          A large amount of the cancer cell line data has been collected based on
          annotations and pointers from{" "}
          <ExternalLink
            href="https://web.expasy.org/cellosaurus/"
            label="Cellosaurus"
          />
          {" "}, a reference knowledge resource on cell lines.
        </p>

        <Admonition
          title="Citation"
          content='
          <ul>
            <li>
              cancercelllines.org: <strong>Cancer cell line oncogenomic online resource</strong> (2023)
            </li>
            <li>Paloots R and Baudis M. (2024): 
              <strong><i>cancercelllines.org</i> - a novel resource for genomic variants in cancer cell lines.</strong>
              <em>Database (Oxford)</em>. 2024; 2024:baae030 <a href="https://doi.org/10.1093/database/baae030">DOI 10.1093/database/baae030</a> 30 April 2024
            </li>
          </ul>'
        />

      </Panel>

    </Layout>
  )
}

export const getStaticProps = async () => {
  const cellosaurusCountReply = await tryFetch(
    `${SITE_DEFAULTS.PREFETCH_PATH}services/collations/?datasetIds=${SITE_DEFAULTS.DATASETID}&collationTypes=cellosaurus&requestedGranularity=count`
  )
  const ncitCountReply = await tryFetch(
    `${SITE_DEFAULTS.PREFETCH_PATH}services/collations/?datasetIds=${SITE_DEFAULTS.DATASETID}&collationTypes=NCIT&includeDescendantTerms=false&requestedGranularity=count`
  )
  const subsetsReply = await tryFetch(
    `${SITE_DEFAULTS.PREFETCH_PATH}services/collations/?datasetIds=${SITE_DEFAULTS.DATASETID}&collationTypes=cellosaurus&deliveryKeys=count,id,label,cnv_analyses`
  )
  return {
    props: {
      ncitCount: ncitCountReply.responseSummary.numTotalResults,
      cellosaurusCount: cellosaurusCountReply.responseSummary.numTotalResults,
      subsetsResponse: subsetsReply
    }
  }
}

