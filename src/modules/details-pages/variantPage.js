import {
  SITE_DEFAULTS,
  getDataItemUrl,
  useDataItemDelivery,
  // replaceWithProxy,
  // useProgenetixApi,
  NoResultsHelp
} from "../../hooks/api"
import { ExternalLink, referenceLink } from "../../components/helpersShared/linkHelpers"
import { WithData } from "../../components/Loader"
import { withUrlQuery } from "../../hooks/url-query"
import { Layout } from "../../components/Layout"
import { ShowJSON } from "../../components/RawData"
import React from "react"

const entity = "variants"
const exampleId = "5bab576a727983b2e00b8d32"

const VariantDetailsPage = withUrlQuery(({ urlQuery }) => {
  var { id } = urlQuery
  var datasetIds = SITE_DEFAULTS.DATASETID
  const hasAllParams = id && datasetIds
  return (
    <Layout title="Variant Details">
      {!hasAllParams ? (
        NoResultsHelp(exampleId, entity)
      ) : (
        <VariantLoader id={id} datasetIds={datasetIds} />
      )}
    </Layout>
  )
})

export default VariantDetailsPage

function VariantLoader({ id, datasetIds }) {
  const apiReply = useDataItemDelivery(id, entity, datasetIds)
  return (
    <WithData
      apiReply={apiReply}
      background
      render={(response) => (
        <VariantResponse
          response={response}
          id={id}
          datasetIds={datasetIds}
        />
      )}
    />
  )
}

function VariantResponse({ response, id, datasetIds }) {
  if (!response.response.resultSets[0].results) {
    return NoResultsHelp(exampleId, entity)
  }
  return <Variant variant={response.response.resultSets[0].results[0]} id={id} datasetIds={datasetIds} />
}


function Variant({ variant, id, datasetIds }) {
  return (
    <section className="content">
      <h2>
        Variant Details for <i>{id}</i>
      </h2>

      <h5>Digest</h5>
      <p>{variant.variantInternalId}</p>

      {variant.variation.molecularAttributes && (
            <>
        <h5>Molecular Attributes</h5>
        <p>Gene: <b>{variant.variation.molecularAttributes.geneIds[0]}</b></p>
      </>
      )}
      {variant.variation.molecularAttributes && variant.variation.molecularAttributes.molecularEffects && (
            <>
        <p>Molecular effect: {variant.variation.molecularAttributes.molecularEffects[0].label}</p>
        </>
        )}

      {variant.variation.molecularAttributes && variant.variation.molecularAttributes.aminoacidChanges && (
            <>
        <p>Aminoacid changes: </p>
         <ul>
          {variant.variation.molecularAttributes.aminoacidChanges.map((aa) =>
            <li key={aa}>
              {aa}
            </li>
          )}
        </ul>
        </>
      )}

     {variant.variation.identifiers && variant.variation.identifiers.proteinHGVSIds && (
           <>
       <p>Protein HGVSids:</p>
         <ul>
          {variant.variation.identifiers.proteinHGVSIds.map((ph) =>
            <li key={ph}>
              {ph}
            </li>
          )}
        </ul>
        </>
       )}

     {variant.variation.identifiers && variant.variation.identifiers.clinvarIds && (
           <>
       <p>ClinVar IDs:</p>
         <ul>
            <li>
              <ExternalLink
                href={`www.ncbi.nlm.nih.gov/clinvar/variation/${variant.variation.identifiers.clinvarIds[0][0]}`}
                label={variant.variation.identifiers.clinvarIds[0][0]}
              />
            </li>
            <li>
                {variant.variation.identifiers.clinvarIds[0][1]}
            </li>
        </ul>
        </>
        )}

      {variant.variation.variantLevelData && variant.variation.variantLevelData.clinicalInterpretations.length > 0 && (
                <>
      <h5>Clinical Interpretations</h5>
      <p>Clinical Relevance: <b>{variant.variation.variantLevelData.clinicalInterpretations[0].clinicalRelevance}</b></p>
      <table>
      <tr>
        <th>ID</th>
        <th>Description</th>
      </tr>
      {variant.variation.variantLevelData.clinicalInterpretations?.map((clinicalInterpretations, key) => {
        return (
          <tr key={key}>
            <td>
            {referenceLink(clinicalInterpretations.effect) ? (
              <ExternalLink
                href={referenceLink(clinicalInterpretations.effect)}
                label={clinicalInterpretations.effect.id}
              />
            ) : (
              clinicalInterpretations.effect.id
            )}
            </td>
            <td>{clinicalInterpretations.effect.label}</td>
          </tr>
        )
        })}
      </table>
      </>
      )}

      {variant.variation.molecularAttributes && variant.variation.molecularAttributes.molecularEffects && (
            <>
        <p>Source: CCLE mutations</p>
        </>
        )}

        {variant.variation.identifiers && variant.variation.identifiers.clinvarIds && (
              <>
        <p>Source: ClinVar</p>
        </>
        )}

        {variant.variation.variantAlternativeIds && (
            <>
                <p>Alternative Variant IDs: </p>
                <ul>
                    {variant.variation.variantAlternativeIds.map((aa) =>
                        <li key={aa}>
                            {aa.id}
                            :
                            {aa.label}
                        </li>
                    )}
                </ul>
            </>
        )}

      <ShowJSON data={variant} />

      <h5>
        Download Data as Beacon v2{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href={getDataItemUrl(id, entity, datasetIds)}
        >
          {"{JSON↗}"}
        </a>
      </h5>
    </section>
  )
}
