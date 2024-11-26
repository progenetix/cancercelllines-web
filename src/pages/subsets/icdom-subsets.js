import React from "react"
import { Layout } from "../../components/Layout"
import SubsetsHierarchyLoader from  "../../components/SubsetsHierarchyLoader"
import { SITE_DEFAULTS } from "../../hooks/api"

export default function icdom_SubsetsPage() {
  return (
    <Layout title="Subsets" headline="International Classification of Diseases in Cancer ICD-O 3 Codes">
      <div className="content">
        <p>
          The cancer samples in Progenetix are mapped to several classification
          systems. For each of the classes, aggregated date is available by
          clicking the code. Additionally, a selection of the corresponding
          samples can be initiated by clicking the sample number or selecting
          one or more classes through the checkboxes.
        </p>
        <p>
          Sample selection follows a hierarchical system in which samples
          matching the child terms of a selected class are included in the
          response.
        </p>
      </div>
      <SubsetsHierarchyLoader collationTypes="icdom" datasetIds={SITE_DEFAULTS.DATASETID} />
    </Layout>
  )
}
