import {
  SITE_DEFAULTS,
  getServiceItemUrl,
  useServiceItemDelivery,
  sampleSearchPageFiltersLink,
  NoResultsHelp
} from "../../hooks/api"
import { Loader } from "../../components/Loader"
import { Layout } from "../../components/Layout"
import { ShowJSON } from "../../components/RawData"
import { SubsetHistogram } from "../../components/Histogram"
import { withUrlQuery } from "../../hooks/url-query"

const service = "collations"
const exampleId = "NCIT:C3262"

const SubsetDetailsPage = withUrlQuery(({ urlQuery }) => {
  var { id } = urlQuery
  var datasetIds = SITE_DEFAULTS.DATASETID
  const hasAllParams = id && datasetIds
  return (
    <Layout title="Subset Details">
      {!hasAllParams ? (
        NoResultsHelp(exampleId, "subsetdetails")
      ) : (
      <>
      <SubsetLoader id={id} datasetIds={datasetIds} />
      
      <div className="mb-3">
        <SubsetHistogram
          id={id}
          datasetIds={datasetIds}
          // labelstring="17:10000000-3000000:TEST"
          loaderProps={{
            background: true,
            colored: true
          }}
        />
      </div>
      </>

      )}
    </Layout>
  )
})

export default SubsetDetailsPage

function SubsetLoader({ id, datasetIds }) {
  const { data, error, isLoading } = useServiceItemDelivery(
    id,
    service,
    datasetIds
  )
  return (
    <Loader isLoading={isLoading} hasError={error} background>
      {data && (
        <SubsetResponse response={data} id={id} datasetIds={datasetIds} />
      )}
    </Loader>
  )
}

function SubsetResponse({ response, datasetIds }) {
  if (!response.response.results[0]) {
    return NoResultsHelp(exampleId, "subsetdetails")
  }

  return <Subset subset={response.response.results[0]} datasetIds={datasetIds} />
}

function Subset({ subset, datasetIds }) {
  
  const filters = subset.id
  const sampleFilterScope = "freeFilters"
  
  const pgxRegex = new RegExp('^.*cancercelllines.*/services/.*?$')
    
  return (
    <section className="content">
      <h2>
        Subset Details {subset.label} ({subset.id})
      </h2>

      {subset.type && (
        <>
          <h5>Subset Type:{" "}{subset.type}{" "}
            
            {
              ! pgxRegex.test(subset.reference) && (
                <>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={ subset.reference }
                    >
                    {"{"}{ subset.id }{" ↗}"}
                    </a>
                </>
              )   
              
            } 
            
          </h5>
        </>
      )}      

      <h5>Sample Count: {subset.count} ({subset.codeMatches} direct {'"'}{subset.id}{'"'} code  matches)</h5>

      <h5>
        Select {subset.id} samples in the 
        <a
          rel="noreferrer"
          target="_blank"
          href={ sampleSearchPageFiltersLink({datasetIds, sampleFilterScope, filters}) }
        >{" "}Search Form
        </a>
      </h5>

      <ShowJSON data={subset} />
      
      <h5>
        Download Data as Beacon v2{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href={getServiceItemUrl(subset.id, service, datasetIds)}
        >
          {"{Beacon JSON ↗}"}
        </a>
      </h5>
    </section>
  )
}
