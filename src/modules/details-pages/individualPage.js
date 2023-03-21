import {
  SITE_DEFAULTS,
  useDataItemDelivery,
  NoResultsHelp
} from "../../hooks/api"
import { referenceLink, InternalLink, ExternalLink } from "../../components/helpersShared/linkHelpers"
import { WithData } from "../../components/Loader"
import { withUrlQuery } from "../../hooks/url-query"
import { Layout } from "../../components/Layout"
import { ShowJSON } from "../../components/RawData"

const itemColl = "individuals"
const exampleId = "pgxind-kftx266l"

const IndividualDetailsPage = withUrlQuery(({ urlQuery }) => {
  var { id } = urlQuery
  var datasetIds = SITE_DEFAULTS.DATASETID
  const hasAllParams = id && datasetIds
  return (
    <Layout title="Individual Details">
      {!hasAllParams ? (
        NoResultsHelp(exampleId, itemColl)
      ) : (
        <IndividualLoader id={id} datasetIds={datasetIds} />
      )}
    </Layout>
  )
})

export default IndividualDetailsPage

function IndividualLoader({ id, datasetIds }) {
  const apiReply = useDataItemDelivery(id, itemColl, datasetIds)
  return (
    <WithData
      apiReply={apiReply}
      background
      render={(response) => (
        <IndividualResponse
          response={response}
          id={id}
          datasetIds={datasetIds}
        />
      )}
    />
  )
}

function IndividualResponse({ response, datasetIds }) {
  if (!response.response.resultSets[0].results) {
    return NoResultsHelp(exampleId, itemColl)
  }
  return <Individual individual={response.response.resultSets[0].results[0]} datasetIds={datasetIds} />
}

function Individual({ individual, datasetIds }) {
  return (
    <section className="content">
      <h2 className="mb-6">
        Individual Details <i>{individual.id}</i>
      </h2>

     {individual.description && (
        <>
          <h5>Description</h5>
          <p>{individual.description}</p>
        </>
      )}

       {individual.sex && (
        <>
          <h5>Genotypic Sex</h5>
          <p>{individual.sex.label}</p>
        </>
      )}
      {individual.genomeAncestry && individual.genomeAncestry?.length > 0 &&
        <>
          <h5>Genome Ancestry</h5>
          <table style={{ width: "120px" }}>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Percentage</th>
            </tr>
            {individual.genomeAncestry?.map((genomeAncestry, key) => {
              return (
                <tr key={key}>
                  <td>{genomeAncestry.id}</td>
                  <td>{genomeAncestry.label}</td>
                  <td>{genomeAncestry.percentage}</td>
                </tr>
              )
            })}
          </table>
        </>
      }

      {individual.onset &&
        <p>
          Age at Collection: {individual.onset?.age}
        </p>
      }

      {individual.diseaseCode &&
        <>
          <h5>Diagnosis</h5>
          <p>{individual.diseaseCode?.label}</p>
        </>
      }

{/*            {cl?.description}{" "}
*/}
      {individual.cellLines &&
        <>
        <h5>Cell Lines</h5>
        <ul>
        {individual.cellLines.map((cl, i) => (
          <li key={i}>
            {cl.description && (cl.description)}
            <ExternalLink
              href={referenceLink(cl)}
              label={`: ${cl.id}`}
            />
          </li>
        ))}
        </ul>
        </>
      }

      <h5>Biosamples</h5>
      {individual.biosamples?.map((bs, i) => (
        <li key={i}>
        <InternalLink
          href={`/biosample/?id=${bs}&datasetIds=${ datasetIds }`}
          label={bs}
        />
        </li>
      ))}

      <ShowJSON data={individual} />
      
      <h5>Download</h5>
      <ul>
        <li>Subject data as{" "}
          <InternalLink
            href={`/beacon/individuals/${individual.id}/`}
            label="Beacon JSON"
          />
        </li>
        <li>Sample data as{" "}
          <InternalLink
            href={`/beacon/individuals/${individual.id}/phenopackets/`}
            label="Beacon Phenopacket JSON"
          />
        </li>
        <li>Variants as{" "}
          <InternalLink
            href={`/beacon/individuals/${individual.id}/variants/`}
            label="Beacon JSON"
          />
        </li>
        <li>Variants as{" "}
          <InternalLink
            href={`/beacon/individuals/${individual.id}/variants/?output=pgxseg`}
            label="Progenetix .pgxseg file"
          />
        </li>
        <li>Variants as{" "}
          <InternalLink
            href={`/beacon/individuals/${individual.id}/variants/?output=vcf`}
            label="(experimental) VCF 4.4 file"
          />
        </li>
      </ul>

    </section>
  )
}
