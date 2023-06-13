import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

function Modal({ produtos, closeModal }) {
  const MyDocument = () => (
    <Document>
      <Page>
        <View style={styles.container}>
          <Text style={styles.heading}>Produtos</Text>
          {produtos.map((produto) => (
            <View key={produto.id} style={styles.produto}>
              <Text style={styles.label}>ID:</Text>
              <Text>{produto.id}</Text>
              <Text style={styles.label}>Nome:</Text>
              <Text>{produto.nome}</Text>
              <Text style={styles.label}>Categoria:</Text>
              <Text>{produto.categoria.nome}</Text>
              <Text style={styles.label}>Tamanho:</Text>
              <Text>{produto.tamanho || '-'}</Text>
              <Text style={styles.label}>Quantidade:</Text>
              <Text>{produto.quantidade}</Text>
              <Text style={styles.label}>Valor:</Text>
              <Text>{produto.valor}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    heading: {
      fontSize: 18,
      marginBottom: 10,
    },
    produto: {
      marginBottom: 20,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 5,
    },
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <button
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
          onClick={closeModal}
        >
          Fechar
        </button>
        <h2>Produtos</h2>
        <PDFDownloadLink document={<MyDocument />} fileName="produtos.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Carregando PDF...' : 'Baixar PDF'
          }
        </PDFDownloadLink>
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              /* Estilos adicionais para os cards de produtos */
            }}
          >
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            {/* Adicione aqui as informações adicionais do produto */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modal;
