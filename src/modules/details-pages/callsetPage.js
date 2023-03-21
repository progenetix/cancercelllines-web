import {
  SITE_DEFAULTS,
  getDataItemUrl,
  useDataItemDelivery,
  NoResultsHelp
} from "../../hooks/api"
import { InternalLink } from "../../components/helpersShared/linkHelpers"

import { Loader } from "../../components/Loader"
import { withUrlQuery } from "../../hooks/url-query"
import { Layout } from "../../components/Layout"

const itemColl = "callsets"
const exampleId = "pgxcs-kftvlijb"

const CallsetDetailsPage = withUrlQuery(({ urlQuery }) => {
  var { id } = urlQuery
  var datasetIds = SITE_DEFAULTS.DATASETID
  const hasAllParams = id && datasetIds
  return (
    <Layout title="Callset Details" headline="Callset Details">
      {!hasAllParams ? (
        NoResultsHelp(exampleId, itemColl)
      ) : (
        <CallsetLoader id={id} datasetIds={datasetIds} />
      )}
    </Layout>
  )
})

export default CallsetDetailsPage

function CallsetLoader({ id, datasetIds }) {
  const { data, error, isLoading } = useDataItemDelivery(
    id,
    itemColl,
    datasetIds
  )
  return (
    <Loader isLoading={isLoading} hasError={error} background>
      {data && (
        <CallsetResponse response={data} id={id} datasetIds={datasetIds} />
      )}
    </Loader>
  )
}

function CallsetResponse({ response, datasetIds }) {
  if (!response.response.resultSets[0].results) {
    return NoResultsHelp(exampleId, itemColl)
  }

  return <Callset callset={response.response.resultSets[0].results[0]} datasetIds={datasetIds} />
}

//  ({SITE_DEFAULTS.DATASETLABEL})

function Callset({ callset, datasetIds }) {
  return (
    <section className="content">
      <h3 className="mb-6">
        {callset.id}
      </h3>

      {callset.description && (
        <>
          <h5>Description</h5>
          <p>{callset.description}</p>
        </>
      )}

      {callset.biosampleId && (
        <>
          <h5>Biosample</h5>
          <p>
            <InternalLink
              href={`/biosample?id=${callset.biosampleId}&datasetIds=${datasetIds}`}
              label={callset.biosampleId}
            />
          </p>
        </>
      )}

      <h5>
        Download Data as Beacon v2{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href={getDataItemUrl(callset.id, itemColl, datasetIds)}
        >
          {"{JSON↗}"}
        </a>
      </h5>
    </section>
  )
}
