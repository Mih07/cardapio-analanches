import { useState } from 'react'
import { Analytics } from "@vercel/analytics/react"
import './App.css'

function App() {
  // --- ESTADOS ---
  const [carrinho, setCarrinho] = useState([]); 
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [cliente, setCliente] = useState({ nome: '', endereco: '', pagamento: 'Pix' });
  
  // Cálculo do total baseado no precoFixo
  const total = carrinho.reduce((soma, item) => soma + (item.precoFixo || 0), 0);

  // --- DADOS DO RESTAURANTE ---
  const restaurante = { 
    nome: "Ana Lanches E \n Refeições", 
    fone: "551199288-5791" 
  };
  
  // --- SEUS PRODUTOS ---
  const produtos = [
    // LANCHES hamburguer de carne
    { id: 1, nome: "1. X-BURGUER", precoFixo:13.00, categoria: "Lanches Hambúrguer de carne", destaque: false, desc: "Pão de Hambúrguer, hamburguer(90gr) e mussarela.", imagem: "/x-burguer.png" },
    { id: 2, nome: "2. X-SALADA", precoFixo: 15.00, categoria: "Lanches Hambúrguer de carne", destaque: true, desc: "Pão de Hambúrguer, hamburguer(90gr), mussarela, tomate, alface e molho.", imagem: "/x-salada.png" },
    { id: 3, nome: "3. X-EGG", precoFixo: 17.00, categoria: "Lanches Hambúrguer de carne", destaque: false, desc: "Pão de hambúrguer, hambúrguer(90gr), mussarela, alface, ovo e molho.", imagem: "/x-egg.png" },
    { id: 4, nome: "4. X-BACON", precoFixo: 20.00, categoria: "Lanches Hambúrguer de carne", destaque: false, desc: "Pão de hambúrguer, hambúrguer(90gr), ovo, queijo, bacon, alface e molho.", imagem: "/x-bacon.png" },
    { id: 5, nome: "5. ESPECIAL", precoFixo: 25.00, categoria: "Lanches Hambúrguer de carne", destaque: false, desc: "Pão de hambúrguer, 2 hambúrgues(90gr cada), mussarela, alface, tomate e molho.", imagem: "/especial.png" },
    { id: 6, nome: "6. X-SALADA CALABRESA", precoFixo: 30.00, categoria: "Lanches Hambúrguer de carne", destaque: false, desc: "Pão de hambúrguer, hambúrguer, mussarela, calabresa fatiada defumada, alface, tomate e molho.", imagem: "/x-saladacalabresa.png" },
    { id: 7, nome: "7. X-TUDO", precoFixo: 40.00, categoria: "Lanches Hambúrguer de carne", destaque: false, desc: "Pão de broa, 2 hambúrguers (90gr cada), 2 ovos, quatro fatias de mussarela, calabresa defumada, seis fatias de bacon, alface, tomate e molho.", imagem: "/xtudo.jpg" },
    // LANCHES hamburguer de frango
    { id: 8, nome: "8. X-BURGUER FRANGO", precoFixo:18.00, categoria: "Lanches de Frango", destaque: false, desc: "Pão de hambúrguer, hambúrguer de frango empanado com mussarela.", imagem: "/x-burguerf.png" },
    { id: 9, nome: "9. X-SALADA FRANGO", precoFixo: 20.00, categoria: "Lanches de Frango", destaque: false, desc: "Pão de hambúrguer, hambúrguer de frango empanado, mussarela, alface, tomate e molho.", imagem: "/x-saladaf.png" },
    { id: 10, nome: "10. X-EGG FRANGO", precoFixo: 25.00, categoria: "Lanches de Frango", destaque: false, desc: "Pão de hambúrguer, hambúrguer de frango empanado, mussarela, alface, ovo e molho.", imagem: "/x-eggf.png" },
    { id: 11, nome: "11. X-BACON COM FRANGO", precoFixo: 30.00, categoria: "Lanches de Frango", destaque: false, desc: "Pão de hambúrguer, hambúrguer de frango empanado, ovo, mussarela, bacon e alface e molho", imagem: "/x-baconf.png" },
    { id: 12, nome: "12. ESPECIAL FRANGO", precoFixo: 35.00, categoria: "Lanches de Frango", destaque: false, desc: "Pão de hambúrguer, 2 hambúrgueres de frango empanado, alface, tomate, mussarela e molho.", imagem: "/especialf.png" },
    { id: 13, nome: "13. X-TUDO FRANGO", precoFixo: 50.00, categoria: "Lanches de Frango", destaque: false, desc: "Pão de broa, 2 hambúrguers de frango empanado, 2 ovos, calabresa defumada, mussarela, bacon, alface, tomate e molho.", imagem: "/xtudof.png" },
    
    // LANCHES
    { id: 30, nome: "1. PÃO COM MARGARINA", precoFixo: 4.00, categoria: "Lanches", destaque: false, desc: "Pão francês com margarina." },
    { id: 31, nome: "2. PÃO NA CHAPA", precoFixo: 6.00, categoria: "Lanches", destaque: false, desc: " " },
    { id: 32, nome: "3. PÃO COM 2 OVOS E QUEIJO", precoFixo: 7.00, categoria: "Lanches", destaque: false, desc: "" },
    { id: 33, nome: "4. MISTO QUENTE", precoFixo: 10.00, categoria: "Lanches", destaque: false, desc: " " },
    { id: 34, nome: "5. MISTO COM OVO", precoFixo: 13.00, categoria: "Lanches", destaque: false, desc: "" },
    { id: 35, nome: "6. BAURU", precoFixo: 13.00, categoria: "Lanches", destaque: false, desc: " " },
    { id: 36, nome: "7. PÃO COM MORTADELA", precoFixo: 10.00, categoria: "Lanches", destaque: false, desc: "" },
    { id: 37, nome: "8. PÃO COM MORTADELA, QUEIJO E OVO", precoFixo: 15.00, categoria: "Lanches", destaque: false, desc: " " },
    { id: 38, nome: "9. AMERICANO", precoFixo: 18.00, categoria: "Lanches", destaque: false, desc: "3 fatias de presunto, 2 fatias de mussarela, ovo, alface e tomate." },

    // CAFÉ DA MANHÃ
    { id: 39, nome: "1. CAFÉ", precoFixo: 7.00, categoria: "Café da Manhã", destaque: false, desc: "Meio copo de café", imagem: "/meio-cafe.png" },
    { id: 40, nome: "2. CAFÉ 180 ML", precoFixo: 4.00, categoria: "Café da Manhã", destaque: true, desc: "Copo cheio de café  ", imagem: "/cafe.png" },
    { id: 41, nome: "3. CAFÉ COM LEITE", precoFixo: 5.00, categoria: "Café da Manhã", destaque: false, desc: "", imagem: "/cafe-leite.png" },
    { id: 42, nome: "4. ACHOCOLATADO", precoFixo: 6.00, categoria: "Café da Manhã", destaque: false, desc: " ", imagem: "/achocolatado.png" },
        
    // SALGADOS
    { id: 21, nome: "COXINHA DE FRANGO", precoFixo: 8.00, categoria: "Salgados", destaque: false, desc: "" },
    { id: 22, nome: "ESFIHA DE CARNE", precoFixo: 8.00, categoria: "Salgados", destaque: false, desc: "" },
    { id: 23, nome: "ESFIHA DE CALABRESA", precoFixo: 8.00, categoria: "Salgados", destaque: false, desc: "" },
    { id: 24, nome: "ESFIHA DE FRANGO COM CATUPITY", precoFixo: 8.00, categoria: "Salgados", destaque: false, desc: "" },
    { id: 25, nome: "BAURU", precoFixo: 8.00, categoria: "Salgados", destaque: false, desc: "" },
    { id: 26, nome: "HAMBURGÃO", precoFixo: 8.00, categoria: "Salgados", destaque: false, desc: "" },
    
    // DOCES
    { id: 27, nome: "BOLO DE ABACAXI COM COCO ", precoFixo: 4.00, categoria: "Doces", destaque: false, desc: "fatia", imagem: "/abacaxi-coco.png" },
    { id: 28, nome: "BOLO DE CHOCOLATE COM LIMÃO", precoFixo: 4.00, categoria: "Doces", destaque: false, desc: "fatia", imagem: "/chocolate-limao.png" },
    { id: 29, nome: "BOLO DE CHOCOLATE COM CENOURA E MANDIOCA ", precoFixo: 4.00, categoria: "Doces", destaque: false, desc: "fatia", imagem: "/chocolate-cenoura.png" },   
    { id: 30, nome: "BROA", precoFixo: 4.00, categoria: "Doces", destaque: false, desc: "", imagem: "/broa.png" },
    
    // BEBIDAS 350ml
    { id: 50, nome: "Coca-Cola", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    { id: 50, nome: "Coca-Cola Zero", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    { id: 50, nome: "Turbaína", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    { id: 50, nome: "Guaraná Zero", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    { id: 51, nome: "Guaraná", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    { id: 52, nome: "Pespi", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    { id: 53, nome: "Fanta Laranja", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    { id: 53, nome: "Fanta Uva", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    { id: 54, nome: "Schweppes", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    {id: 53, nome: "Água Tônica", precoFixo: 7.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 350ml gelada." },
    
    // BEBIDAS 600ml
    {id: 53, nome: "Coca-Cola", precoFixo: 10.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 600ml gelada." },
    {id: 53, nome: "Fanta Laranja", precoFixo: 10.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 600ml gelada." },
    {id: 53, nome: "Fanta Uva", precoFixo: 10.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 600ml gelada."},
    // BEBIDAS 1L
    {id: 53, nome: "Coca-Cola", precoFixo: 10.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 1 litro gelada." },
    {id: 53, nome: "Guaraná", precoFixo: 13.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 1 litro gelada." },
    // BEBIDAS 1,5l
    {id: 53, nome: "Guaraná", precoFixo: 15.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 1,5 litro gelada." },
    {id: 53, nome: "Fanta Laranja", precoFixo: 15.00, categoria: "Refrigerantes", destaque: false, desc: "Lata 1,5 litro gelada." },
    
    // BEBIDAS 2,5l
    { id: 55, nome: "Coca-Cola  ", precoFixo: 18.00, categoria: "Refrigerantes", destaque: false, desc: "Garrafa 2,5 litros." },
    // Água 500ml
    { id: 57, nome: "Água natural ", precoFixo: 3.50, categoria: "Água", destaque: false, desc: "Garrafa 500ml" },
    { id: 58, nome: "Água com gás ", precoFixo: 4.50, categoria: "Água", destaque: false, desc: "Garrafa" },
    // SUCO NATURAL 500ML
    { id: 59, nome: "Suco Natural de Goiaba ", precoFixo: 8.00, categoria: "Suco natural", destaque: false, desc: "Copo 500ml." },
    { id: 60, nome: "Suco Natural de Maracujá ", precoFixo: 8.00, categoria: "Suco natural", destaque: false, desc: "Copo 500ml." },
    { id: 60, nome: "Suco Natural de Abacaxi com Hortelã ", precoFixo: 8.00, categoria: "Suco natural", destaque: false, desc: "Copo 500ml." },


    // SUCO DELL VALE 260ME
    { id: 59, nome: "Suco de Goiaba", precoFixo: 9.00, categoria: "Suco", destaque: false, desc: "Lata 260 ml gelada." },
    { id: 60, nome: "Suco de Maracujá ", precoFixo: 9.00, categoria: "Suco", destaque: false, desc: "Lata 260 ml gelada." },
    { id: 59, nome: "Suco de Pêssego", precoFixo: 9.00, categoria: "Suco", destaque: false, desc: "Lata 260 ml gelada." },
    { id: 60, nome: "Suco de Uva ", precoFixo: 9.00, categoria: "Suco", destaque: false, desc: "Lata 260 ml gelada." },

  ];

  // --- FUNÇÕES ---
  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, { ...produto, id_unico: Date.now() + Math.random() }]);
  };

  const removerDoCarrinho = (id_unico) => {
    setCarrinho(carrinho.filter(item => item.id_unico !== id_unico));
  };

  const enviarWhatsApp = () => {
    if (!cliente.nome || !cliente.endereco) {
      alert("Preencha seu nome e endereço!");
      return;
    }

    const itensMsg = carrinho.map(i => `- ${i.nome}: R$ ${i.precoFixo.toFixed(2)}`).join('\n');
    
    // Note que alterei para o nome do restaurante da cliente aqui na mensagem:
    const msg = encodeURIComponent(`*PEDIDO ANA LANCHES*\n\n*Cliente:* ${cliente.nome}\n*Endereço:* ${cliente.endereco}\n*Pagamento:* ${cliente.pagamento}\n\n*Itens:*\n${itensMsg}\n\n*Total: R$ ${total.toFixed(2)}*`);
    
    window.open(`https://wa.me/${restaurante.fone}?text=${msg}`, '_blank');

    // --- ADICIONE ESTAS DUAS LINHAS ABAIXO ---
    setCarrinho([]); // Esvazia o carrinho de compras
    setCarrinhoAberto(false); // Fecha a janelinha do carrinho para voltar ao cardápio
  };

  return (
    <div className="container">
      <Analytics />
      {/* HEADER ESTILO MODERNO */}
      <header className="header-dinamico">
        <div className="header-content">
          <img src="/logo.png" alt="Logo" className="logo-restaurante" />
          <div className="header-info">
            <h1>{restaurante.nome}</h1>
            <div className="status-container">
              <span className="badge-status">● Aberto</span>
              <span className="tempo-entrega">🕒 30-45 min</span>
            </div>
          </div>
          <div className="carrinho-header" onClick={() => setCarrinhoAberto(!carrinhoAberto)}>
            <span className="icone-carrinho">🛒</span>
            {carrinho.length > 0 && <span className="badge-quantidade">{carrinho.length}</span>}
          </div>
        </div>
      </header>

      <main className="container-cardapio">
        {/* DESTAQUES (SÓ OS QUE VOCÊ MARCOU COM DESTAQUE: TRUE) */}
        {/* SEÇÃO DE DESTAQUES (IMAGEM CLICÁVEL) */}
        <section className="secao-destaque">
          <h2>🔥 Destaques da Ana</h2>
          <div className="scroll-horizontal">
            {produtos.filter(p => p.destaque).map(item => (
              <div 
                key={item.id} 
                className="card-destaque" 
                onClick={() => adicionarAoCarrinho(item)} // Ao clicar em qualquer lugar do card, adiciona
                style={{ cursor: 'pointer' }}
              >
                <img src={item.imagem} alt={item.nome} title="Clique para adicionar" />
                {/* Removido o preço e o botão daqui */}
              </div>
            ))}
          </div>
        </section>

        {/* NAVEGAÇÃO DE CATEGORIAS */}
        <nav className="filtros">
          {['Todos', 'Café da Manhã', 'Lanches', 'Doces', 'Salgados', 'Lanches Hambúrguer de carne', 'Lanches de Frango', 'Água', 'Suco natural', 'Suco', 'Refrigerantes'].map(cat => (
            <button key={cat} className={categoriaAtiva === cat ? 'active' : ''} onClick={() => setCategoriaAtiva(cat)}>
              {cat}
            </button>
          ))}
        </nav>

        {/* LISTA COMPLETA */}
        <section className="lista-produtos">
          {['Lanches Hambúrguer de carne', 'Lanches de Frango', 'Café da Manhã', 'Lanches', 'Salgados', 'Doces', 'Água', 'Suco natural', 'Suco', 'Refrigerantes']
            .filter(cat => categoriaAtiva === 'Todos' || categoriaAtiva === cat)
            .map(categoria => (
              <div key={categoria} className="grupo-categoria">
                <h2 className="titulo-categoria-lista">{categoria}</h2>

                {produtos.filter(p => p.categoria === categoria).map(item => (
                  <div key={item.id} className="card-produto-compacto">
                    
                    {/* SÓ MOSTRA A FOTO SE A CATEGORIA NÃO FOR "Bebidas" */}
                      {item.categoria !== "Bebidas" && item.imagem && (
                        <div className="area-foto">
                          <img src={item.imagem} alt={item.nome} />
                        </div>
                      )}
                    <div className="info-texto">
                      <h3>{item.nome}</h3>
                      <p>{item.desc}</p>
                      <div className="acoes-bebida">
                        <strong>R$ {item.precoFixo.toFixed(2)}</strong>
                        <button className="btn-add-simples" onClick={() => adicionarAoCarrinho(item)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </section>
      </main>

      {/* FOOTER DO CARRINHO */}
      {carrinho.length > 0 && (
        <footer className="footer-carrinho">
          {carrinhoAberto && (
            <div className="revisao-pedido">
              <div className="revisao-header">
                <h3>Seu Pedido</h3>
                <button onClick={() => setCarrinhoAberto(false)}>Fechar [x]</button>
              </div>
              <ul className="itens-revisao">
                {carrinho.map((item) => (
                  <li key={item.id_unico}>
                    <span>{item.nome}</span>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <strong>R$ {item.precoFixo.toFixed(2)}</strong>
                      <button onClick={() => removerDoCarrinho(item.id_unico)} className="btn-remover">🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="dados-cliente">
                <h4>Dados para Entrega</h4>
                <input type="text" placeholder="Seu Nome" value={cliente.nome} onChange={(e) => setCliente({...cliente, nome: e.target.value})} />
                <input type="text" placeholder="Endereço Completo" value={cliente.endereco} onChange={(e) => setCliente({...cliente, endereco: e.target.value})} />
                <select value={cliente.pagamento} onChange={(e) => setCliente({...cliente, pagamento: e.target.value})}>
                  <option value="Pix">Pix</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>
            </div>
          )}
          <div className="total-info" onClick={() => setCarrinhoAberto(!carrinhoAberto)} style={{cursor: 'pointer'}}>
            <span>{carrinhoAberto ? "⬇️ Ocultar Itens" : "⬆️ Ver Itens do Pedido"}</span>
            <span>Total: <strong>R$ {total.toFixed(2)}</strong></span>
          </div>
          <button className="btn-pedido" onClick={enviarWhatsApp}>Finalizar pelo WhatsApp</button>
        </footer>
      )}
    </div>
  )
}

export default App