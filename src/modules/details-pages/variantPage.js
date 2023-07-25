import {
  SITE_DEFAULTS,
  useDataItemDelivery,
  NoResultsHelp
} from "../../hooks/api"
import { BeaconRESTLink, ExternalLink, InternalLink, ReferenceLink } from "../../components/helpersShared/linkHelpers"
// import {InternalLink } from "../../components/helpersShared/linkHelpers"
import { WithData } from "../../components/Loader"
import { withUrlQuery } from "../../hooks/url-query"
import { Layout } from "../../components/Layout"
import { ShowJSON } from "../../components/RawData"
import React from "react"
const entity = "variants"
const exampleId = "5bab576a727983b2e00b8d32"

// import '@fontsource/roboto'
// import {
//     createViewState,
//     JBrowseLinearGenomeView,
// } from '@jbrowse/react-linear-genome-view'
//
// const defaultSession = {
//     name: 'My session',
//     view: {
//         id: 'linearGenomeView',
//         type: 'LinearGenomeView',
//         tracks: [
//             {
//                 type: 'ReferenceSequenceTrack',
//                 configuration: 'GRCh38-ReferenceSequenceTrack',
//                 displays: [
//                     {
//                         type: 'LinearReferenceSequenceDisplay',
//                         configuration:
//                             'GRCh38-ReferenceSequenceTrack-LinearReferenceSequenceDisplay',
//                     },
//                 ],
//             },
//         ],
//     },
// }
//
// const assembly = {
//     name: 'GRCh38',
//     sequence: {
//         type: 'ReferenceSequenceTrack',
//         trackId: 'GRCh38-ReferenceSequenceTrack',
//         adapter: {
//             type: 'BgzipFastaAdapter',
//             fastaLocation: {
//                 uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz',
//                 locationType: 'UriLocation',
//             },
//             faiLocation: {
//                 uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz.fai',
//                 locationType: 'UriLocation',
//             },
//             gziLocation: {
//                 uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz.gzi',
//                 locationType: 'UriLocation',
//             },
//         },
//     },
//     aliases: ['hg38'],
//     refNameAliases: {
//         adapter: {
//             type: 'RefNameAliasAdapter',
//             location: {
//                 uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/hg38_aliases.txt',
//                 locationType: 'UriLocation',
//             },
//         },
//     },
// }
// function View() {
//     const state = createViewState({
//         assembly,
//         // tracks,
//         location: '10:29,838,737..29,838,819',
//         // location: '1:11,127,738-11,127,739',
//         defaultSession,
//     })
//
//     return <JBrowseLinearGenomeView viewState={state} />;
// }


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
  if (!response.response.resultSets[0].results[0]) {
    return NoResultsHelp(exampleId, entity)
  }
  return <Variant variant={response.response.resultSets[0].results[0]} id={id} datasetIds={datasetIds} />
}


function Variant({ variant, id, datasetIds }) {
  return (
<section className="content">
  <h2>
    Variant Details for <i>{id}</i> ({datasetIds})
  </h2>

  {variant.variantInternalId && (
    <>
    <h5>Variant Shorthand Expression</h5>
      <ul>
        <li>{variant.variantInternalId}</li>
        {/*<View />*/}
      </ul>
    </>
  )}


  {variant.caseLevelData && (
    <>
      <h5>Sample Information</h5>
      <ul>
      {variant.caseLevelData[0].biosampleId && (    
        <li>Sample:{" "}
        <InternalLink
          href={`/biosample/?id=${variant.caseLevelData[0].biosampleId}&datasetIds=${ datasetIds }`}
          label={variant.caseLevelData[0].biosampleId}
        />
        </li>
      )}
      </ul>
    </>
  )}

  {variant.variation.molecularAttributes && (
    <>
      <h5>Molecular Attributes</h5>

      <ul>
      {variant.variation.molecularAttributes.geneIds && (
        <li>Gene: <b>{variant.variation.molecularAttributes.geneIds[0]}</b></li>
      )}

      {variant.variation.molecularAttributes.molecularEffects && (
        <li>Molecular effect: {variant.variation.molecularAttributes.molecularEffects[0].label}</li>
      )}

        {variant.variation.molecularAttributes.aminoacidChanges && variant.variation.molecularAttributes.aminoacidChanges.length > 0 && variant.variation.molecularAttributes.aminoacidChanges[0] !== null && (
            <li>Aminoacid changes:
              <ul>
                {variant.variation.molecularAttributes.aminoacidChanges.map((aa) => (
                    <li key={aa}>
                      {aa}
                    </li>
                ))}
              </ul>
            </li>
        )}

      </ul>
    </>
  )}

  {variant.variation.identifiers && (

    <>
    <h5>Variant Identifiers</h5>
    <ul>

    {variant.variation.identifiers.proteinHGVSIds && (
      <li>Protein HGVSids:
        <ul>
        {variant.variation.identifiers.proteinHGVSIds.map((ph) =>
          <li key={ph}>
            {ph}
          </li>
        )}
        </ul>
      </li>
    )}

    {variant.variation.identifiers.genomicHGVSIds && (
      <li>Genomic HGVSids:
        <ul>
        {variant.variation.identifiers.genomicHGVSIds.map((gh) =>
          <li key={gh}>
            {gh}
          </li>
        )}
        </ul>
      </li>
    )}

    {variant.variation.identifiers.clinvarIds && (
        <li>ClinVar IDs:
          <ul>
            <li>
              <ExternalLink
                href={`http://www.ncbi.nlm.nih.gov/clinvar/variation/${variant.variation.identifiers.clinvarIds[0]}`}
                label={variant.variation.identifiers.clinvarIds[1]}
              />
            </li>
          </ul>
        </li>
    )}

    </ul>
    </>

  )}

  {variant.variation.variantAlternativeIds && (
      <div>
        <h5>Variant Alternative IDs</h5>
        <ul>
          {variant.variation.variantAlternativeIds.map((altid, key) => (
              <li key={key}>
                {altid.id} - {altid.label}
              </li>
          ))}
        </ul>
      </div>
  )}



    { variant.variation.variantLevelData?.clinicalInterpretations && (
      <>
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
                {ReferenceLink(clinicalInterpretations.effect) ? (
                  <ExternalLink
                    href={ReferenceLink(clinicalInterpretations.effect)}
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
    </>
    )}

  <h5>Annotation Sources</h5>
  <ul>
  {variant.variation.molecularAttributes && variant.variation.molecularAttributes.molecularEffects && (
    <li>CCLE mutations</li>
  )}
  {variant.variation.identifiers && variant.variation.identifiers.clinvarIds && (
    <li>ClinVar</li>
  )}
  </ul>

  <h5>Download</h5>
  <ul>
    <li>Variant as{" "}
      <BeaconRESTLink
        entryType="variants"
        idValue={id}
        datasetIds={datasetIds}
        label="Beacon JSON"
      />
    </li>
    <li>Variant as{" "}
      <BeaconRESTLink
        entryType="variants"
        idValue={id}
        datasetIds={datasetIds}
        output="pgxseg"
        label="Progenetix .pgxseg file"
      />
    </li>
    <li>Variant as{" "}
      <BeaconRESTLink
        entryType="variants"
        idValue={id}
        datasetIds={datasetIds}
        output="vcf"
        label="(experimental) VCF 4.4 file"
      />
    </li>
  </ul>

  <ShowJSON data={variant} />

</section>)

}
