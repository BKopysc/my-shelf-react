import React from "react";
import {Button}         from "@chakra-ui/react";
import exportFromJSON from "export-from-json";

export default function XMLExport(props) {

  function onClick() {
    const data = props.data;   //dataForXml
    const fileName = props.fileName ? props.fileName : "exported";
    let fields = props.fields ? props.fields : [];  //fieldsAsObjects or fieldsAsStrings, empty list means "use all"
    const exportType = 'xls';
    const withBOM = true;
    exportFromJSON({data, fileName, fields, exportType, withBOM})
  }

  return (
    <Button onClick={onClick} colorScheme={"blue"}>
      Export to XLS
    </Button>
  )

}