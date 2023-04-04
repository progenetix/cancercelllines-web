import React, { useEffect, useState } from "react"
import {
  SITE_DEFAULTS,
  useProgenetixApi,
  sampleSearchPageFiltersLink,
  NoResultsHelp
} from "../../hooks/api"
import { Loader } from "../../components/Loader"
import { Layout } from "../../components/Layout"
import { LiteratureSearch } from "../../components/LiteratureSearch"
import { ShowJSON } from "../../components/RawData"
import { SubsetHistogram } from "../../components/Histogram"
import { ExternalLink, InternalLink } from "../../components/helpersShared/linkHelpers"
import { withUrlQuery } from "../../hooks/url-query"

const service = "collations"
const exampleId = "cellosaurus:CVCL_0023"
const datasetIds = SITE_DEFAULTS.DATASETID

const CellLineDetailsPage = withUrlQuery(({ urlQuery }) => {
  var { id } = urlQuery
  const hasAllParams = id && datasetIds
  const [labels, setLabels] = useState("");

  const iURL = `${SITE_DEFAULTS.API_PATH}beacon/individuals/?filters=${id}&datasetIds=${datasetIds}&limit=1`
  var [individual, setIndividual] = useState([]);
  useEffect(() => {
    fetch( iURL )
       .then((response) => response.json())
       .then((data) => {
          console.log(data.response.resultSets[0].results[0]);
          setIndividual(data.response.resultSets[0].results[0])
       })
       .catch((err) => {
          console.log(err.message);
       });
   }, [setIndividual]);

  return (
    <Layout title="Cell Line Details" headline="Cell Line Details">
      {!hasAllParams ? (
        NoResultsHelp(exampleId, "subsetdetails")
      ) : (
      <>

      <SubsetLoader id={id} individual={individual} datasetIds={datasetIds} />

      <div className="mb-3">
        <SubsetHistogram
          id={id}
          datasetIds={datasetIds}
          labelstring={labels}
          loaderProps={{
            background: true,
            colored: true
          }}
        />
      </div>

      <LiteratureSearch id={id} datasetIds={datasetIds} labels={labels} setLabels={setLabels}/>

      </>
      )}
    </Layout>
  )
})

export default CellLineDetailsPage

/*============================================================================*/
/*============================================================================*/
/*============================================================================*/

function SubsetLoader({ id, individual, datasetIds }) {

  const sURL = `${SITE_DEFAULTS.API_PATH}services/${service}/?id=${id}&datasetIds=${datasetIds}&method=details`

  const { data, error, isLoading } = useProgenetixApi(sURL)

  return (
    <Loader isLoading={isLoading} hasError={error} background>
      {data && (
        <SubsetResponse id={id} individual={individual} response={data} datasetIds={datasetIds} />
      )}
    </Loader>
  )
}

/*============================================================================*/

function SubsetResponse({ id, response, individual, datasetIds }) {
  if (!response.response.results[0]) {
    return NoResultsHelp(exampleId, "subsetdetails")
  }
  return <Subset id={id} subset={response.response.results[0]} individual={individual} datasetIds={datasetIds} />
}

/*============================================================================*/

function Subset({ id, subset, individual, datasetIds }) {
  
  const filters = id
  const sampleFilterScope = "freeFilters"

  console.log(individual);
  console.log(Object.keys(individual));
  
  return (

<section className="content">

  <h2>{subset.label} ({subset.id})</h2>

  {subset.type && (
    <>
      <h5>Subset Type</h5>
      <ul>
        <li>
          {subset.type}{" "}
          <ExternalLink href={subset.reference} label={subset.id} />
        </li>
      </ul>

    </>
  )} 

  {subset?.parentTerms?.length > 1 && (
     <>
        <h5>Parental Cell Lines</h5>
        <ul>
          {subset.parentTerms
            .map(pt => 
              <InternalLink
                href={`/cellline/?id=${pt}&datasetIds=${ datasetIds }`}
                key={pt}
                label={pt}
              />).reduce((prev, curr) => [prev, ' ⇒ ', curr])}
        </ul>
      </>
  )}

  {subset?.childTerms?.length > 1 && (
     <>
        <h5>Derived Cell Lines</h5>
        <ul>
          {subset.childTerms
            .map(pt => 
              <InternalLink
                href={`/cellline/?id=${pt}&datasetIds=${ datasetIds }`}
                key={pt}
                label={pt}
              />).reduce((prev, curr) => [prev, ', ', curr])}
        </ul>
      </>
  )}

  <h3>Donor Details</h3>

  {individual.indexDisease?.diseaseCode && (
    <>
      <h5>Diagnosis</h5>
      <ul>
        <li>
          {individual.indexDisease.diseaseCode.id}{": "}
          {individual.indexDisease.diseaseCode?.label}{" "}
        </li>
      </ul>
    </>
  )}

  {individual.description && (
    <>
      <h5>Description</h5>
      <p>{individual.description}</p>
    </>
  )}

  {individual.sex && (
    <>
      <h5>Genotypic Sex</h5>
      <ul>
        <li>{individual.sex?.label} ({individual.sex.id})</li>
      </ul>
    </>
  )}


{/*  
  {subset.childTerms?.length > 1 && (
     <>
        <h5>Derived Cell Lines</h5>
        <ul>
          {subset.childTerms.map((pt) => (
            pt != id ? (
            <li key={pt}>
              <InternalLink
                href={`/cellline/?id=${pt}&datasetIds=${ datasetIds }`}
                label={pt}
              />
            </li>
            ) : null
          ))}
        </ul>
      </>
  )}
*/}

  <h3>Samples</h3>

  <h5>Sample Counts</h5>
  <ul>
    <li>{subset.count} samples</li>
    <li>{subset.codeMatches} direct <i>{subset.id}</i> code  matches</li>
    <li>{subset.cnvAnalyses} CNV analyses</li>
  </ul>

  <h5>Search Samples</h5>
  <p>Select <i>{subset.id}</i> samples in the{" "}
    <a
      rel="noreferrer"
      target="_blank"
      href={ sampleSearchPageFiltersLink({datasetIds, sampleFilterScope, filters}) }
    >{" "}Search Form
    </a>
  </p> 

  <ShowJSON data={subset} />
  
</section>
  )
}

