// import React from 'react';
import { Page, Text, Document, StyleSheet, Table, TableRow, TableCell,  } from '@react-pdf/renderer';

//! COMPONENTE DE MODELO - NO USAR !//
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Helvetica'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
    table: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#AAAAAA',
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>ACTA DE ENTREGA</Text>
      <Text style={styles.text}>Valencia: fecha</Text>

      <Text style={styles.text}>
        Por medio de la presente, la Corporación Netcom Plus C. A., a través de la Gerencia de Tecnología de
        Información, hace entrega en modo de Asignación los siguientes equipos:
      </Text>

      
      
      <Text>Tabla de Ejemplo</Text>
        <Table style={styles.table}>
          <TableRow style={styles.tableRow}>
            <TableCell style={{ ...styles.tableCell, ...styles.tableHeader }}>ID</TableCell>
            <TableCell style={{ ...styles.tableCell, ...styles.tableHeader }}>Nombre</TableCell>
            <TableCell style={{ ...styles.tableCell, ...styles.tableHeader }}>Edad</TableCell>
          </TableRow>
          <TableRow style={styles.tableRow}>
            <TableCell style={styles.tableCell}>1</TableCell>
            <TableCell style={styles.tableCell}>John Doe</TableCell>
            <TableCell style={styles.tableCell}>30</TableCell>
          </TableRow>
          <TableRow style={styles.tableRow}>
            <TableCell style={styles.tableCell}>2</TableCell>
            <TableCell style={styles.tableCell}>Jane Smith</TableCell>
            <TableCell style={styles.tableCell}>25</TableCell>
          </TableRow> 
        </Table>
       


      <Text style={styles.subtitle}>Condiciones Generales de uso</Text>

      <Text style={styles.text}>
        - Los equipos asignados son propiedad de la empresa y deben ser usados por el personal de Netcom Plus, C. A.
        como una herramienta de trabajo. Por tal motivo en ningún momento se podrá considerar como remuneración o
        salario en especie.
      </Text>
      <Text style={styles.text}>
        - Debe limitarse su uso exclusivamente a actividades relacionadas con su gestión de trabajo.
      </Text>
      <Text style={styles.text}>
        - Es un instrumento costoso, por lo que se debe hacer su mejor esfuerzo para asegurar la protección, cuidado y
        resguardo del equipo.
      </Text>
      <Text style={styles.text}>
        - Reportar a TI a la extensión xxxx cualquier anormalidad en la operatividad del equipo y/o en los sistemas
        instalados en él.
      </Text>
      <Text style={styles.text}>
        - No permitir actividades de personal técnico ajeno a la Empresa.
      </Text>
      <Text style={styles.text}>- Cualquier comentario o duda respecto al uso de este activo, le agradezco dirigirse a esta gerencia.</Text>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>
  </Document>
);


export default MyDocument