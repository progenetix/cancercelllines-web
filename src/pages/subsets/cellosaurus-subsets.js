import React from "react"
import { Layout } from "../../site-specific/Layout"
import { DATASETDEFAULT } from "../../hooks/api"
import SubsetsHierarchyLoader from  "../../components/SubsetsHierarchyLoader"

export default function cellosaurus_SubsetsPage() {
  return (
    <Layout title="Subsets" headline="Cancer Cell Lines by Cellosaurus ID">
      <div className="content">
        <p>
          The cancer cell lines in <i>cancercelllines.org</i> are labeled
          by their Cellosaurus IDs as the primary identifier. Cell lines are
          arranged hierarchially: Daughter cell lines are displayed below the
          primary cell lines they were derived from; <i>i.e.</i> <b>HeLa S3 (CVCL_0058)</b>
          is shown as a daughter cell line of <b>HeLa  (CVCL_0030)</b> and so forth.
        </p>
        <p>
          Sample selection follows a hierarchical system in which samples
          matching the child terms of a selected class are included in the
          response. This means that one can retrieve all instances and daughter
          cell lines of a given cell line in a id-based search (<i>i.e.</i> searching for
          HeLa will also return the daughter lines by default - but optionally).
        </p>
      </div>
      <SubsetsHierarchyLoader collationTypes="cellosaurus" datasetIds={DATASETDEFAULT} />
    </Layout>
  )
}
