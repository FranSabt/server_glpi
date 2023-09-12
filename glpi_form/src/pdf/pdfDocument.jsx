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
    marginHorizontal: 20
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
    marginTop: 10
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
    width: 150,
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
          {/* <Text style={styles.date}>Valencia {`${dia}/${mes}/${anno}`}</Text> */}
          <Text style={styles.title}>NOTA DE ENTREGA</Text>

          <Text style={styles.text}>
            Por medio de la presente, la Organización Netcom Plus C. A., a través
            del departamento de Tecnología de Información (IT), hace entrega en modo de
            asignación del(los) siguiente(s) equipo(s):
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
            1 - Los equipos asignados son propiedad de la empresa y deben ser utilizados exclusivamente por el personal de Netcom Plus, C. A. como herramientas de trabajo. En ningún momento podrán considerarse estos equipos como parte de la remuneración o salario en especie.
          </Text>
          <Text style={styles.conditions}>
            2 - El uso de estos equipos debe estar limitado estrictamente a actividades relacionadas con las responsabilidades laborales del empleado.
          </Text>
          <Text style={styles.conditions}>
            3 - Dado que estos instrumentos representan un costo para la organización, se espera que se realice el mejor esfuerzo para garantizar la protección, cuidado y seguridad de los equipos.
          </Text>
          <Text style={styles.conditions}>
            4 - Cualquier irregularidad en el funcionamiento de los equipos y/o en los sistemas instalados en ellos debe ser notificada al Departamento de Tecnología e Información a través de la extensión 8009 o mediante WhatsApp al número +58 414-4032935.
          </Text>
          <Text style={styles.conditions}>
            5 - No está permitido que personas ajenas a la empresa manipulen los equipos en ningún momento.
          </Text>
          <Text style={styles.conditions}>
            6 - Si surge algún comentario o duda en relación al uso de estos activos, se solicita que se dirija al Departamento de Tecnología e Información para obtener orientación.
          </Text>

          <View style={styles.signatureContainer}>
            <View style={styles.signature}>
              <Text style={styles.signatureLabel}>
                {`Firma\nMirialys Gómez\nGTE. JR. INFO. Y TECNOLOGÍA`}
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

