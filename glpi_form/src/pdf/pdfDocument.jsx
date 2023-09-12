import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import  Logo  from '../assets/NetcomLogo.png'

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  section: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    paddingTop: 25,
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  date: {
    paddingVertical: 10,
    fontSize: 14,
    lineHeight: 1.5,
    fontFamily: "Helvetica-Bold",
    float:"right",
    position: "absolute",
    right: 0,
    top: 0,
  },
  table: {
    marginTop: 10,
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  tableCell: {
    fontSize:10,
    flex: 1,
    padding: 6,
  },
  tableCellTitle: {
    fontSize:12,
    flex: 1,
    padding: 6,
    fontFamily: "Helvetica-Bold",
  },
  signatureContainer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    margin:40
  },
  signature: {
    width: "45%",
    border: "1 solid #000",
    padding: 10,
  },
  signatureLabel: {
    fontSize: 10,
    textAlign: "center",
    marginTop: "15%",
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    marginTop:30,
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  logo: {
    paddingTop: 7,
    width: 100,
    height: 50,
    marginBottom: 20,
  },
  conditions: {
    margin: 1.5,
    fontSize: 11,
    textAlign: "justify",
    fontFamily: "Helvetica",
    fontStyle: 'italic',
  }
});

// const productos = [
//   {
//     serial: "1236456",
//     other_serial: "asdfdsa",
//     name: "PC",
//     type: "PC",
//   },
//   {
//     serial: "65321",
//     other_serial: "jdskladsa",
//     name: "Tablet",
//     type: "Tablet",
//   },
//   {
//     serial: "963852741",
//     other_serial: "plmqwdv",
//     name: "Celular",
//     type: "Celular",
//   },
// ];

const fecha = new Date();

const dia = fecha.getDate(); // Obtener el día del mes (1-31)
const mes = fecha.getMonth() + 1; // Obtener el mes (0-11, por lo que sumamos 1)
const anno = fecha.getFullYear(); // Obtener el año de cuatro dígitos

// eslint-disable-next-line react/prop-types
const PdfDocument = ({user, equipos}) => {
  return (
    <Document>
      <Page size="Letter" style={styles.page}  wrap>
        <View style={styles.section}>
          <Image
            src={Logo}
            style={styles.logo}
          />
          <Text style={styles.date}>Valencia {`${dia}/${mes}/${anno}`}</Text>
          <Text style={styles.title}>NOTA DE ENTREGA</Text>

          <Text style={styles.text}>
            Por medio de la presente, la Organización Netcom Plus C. A., a través
            del departamento de Tecnología de Información (IT), hace entrega en modo de
            asignación los siguientes equipos:
          </Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellTitle}>Equipo</Text>
              <Text style={styles.tableCellTitle}>Serial</Text>
              <Text style={styles.tableCellTitle}>Etiqueta</Text>
              <Text style={styles.tableCellTitle}>Tipo</Text>
            </View>
            {/* // eslint-disable-next-line react/prop-types */}
            {equipos.map((e) => (
              <View key={e.serial} style={styles.tableRow}>
                <Text style={styles.tableCell}>{e.name}</Text>
                <Text style={styles.tableCell}>{e.serial ? e.serial : "NO TIENE SERIAL"}</Text>
                <Text style={styles.tableCell}>{e.other_serial ? e.other_serial : "NO TIENE ETIQUETA "}</Text>
                <Text style={styles.tableCell}>{e.type}</Text>
              </View>
            ))}
          </View>


          {equipos.length > 7 ? 
          <Text style={styles.subtitle} break >CONDICIONES GENERALES DE USO</Text>
          :
          <Text style={styles.subtitle} >CONDICIONES GENERALES DE USO</Text>
          }
          

          <Text style={styles.conditions}>
            - Los equipos asignados son propiedad de la empresa y deben ser
            usados por el personal de Netcom Plus, C. A. como herramienta(s) de
            trabajo. Por tal motivo en ningún momento se podrá considerar dichos equipos como
            remuneración o salario en especie.
          </Text>
          <Text style={styles.conditions}>
            - Debe limitarse su uso exclusivamente a actividades relacionadas
            con su gestión de trabajo.
          </Text>
          <Text style={styles.conditions}>
            - Estos instrumentos implican un costo para la organización, por lo que se debe hacer su mejor
            esfuerzo para asegurar la protección, cuidado y resguardo del
            equipo.
          </Text>
          <Text style={styles.conditions}>
            - Reportar al Departamento de Tecnología e Información a la extensión 8009 o a través de WhatsApp al +58 414-4032935 cualquier anormalidad en la
            operatividad del equipo y/o en los sistemas instalados en él.
          </Text>
          <Text style={styles.conditions}>
            - No permitir manipulación de los equipos por parte de personas ajenas a la empresa.
          </Text>
          <Text style={styles.conditions}>
            - Cualquier comentario o duda respecto al uso de este activo favor dirigirse a este departamento.
          </Text>

          <View style={styles.signatureContainer}>
            <View style={styles.signature}>
              <Text style={styles.signatureLabel}>
                {`Firma\nMirialys Gomez\nGTE. JR. INFO. Y TECNOLOGÍA`}
              </Text>
              {/* Agrega aquí la representación de la firma del Usuario 1 */}
            </View>
            <View style={styles.signature}>
              <Text style={styles.signatureLabel}>{`Recibido por:\n${user.fisrtname} ${user.realname}\n${user.comment}`}</Text>
              {/* Agrega aquí la representación de la firma del Usuario 2 */}
            </View>
          </View>
        </View>
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => `Nota de entrega para ${user.fisrtname} ${user.realname} con fecha: ${dia}/${mes}/${anno}\n\n${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export default PdfDocument;

