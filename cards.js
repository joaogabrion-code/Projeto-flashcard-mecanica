// data/cards.js
// Conteúdo separado da lógica – fácil de adicionar novos cards

const CARDS = [
    // ========== NÍVEL 1 – BÁSICO ==========
    {
        id: "motor-01",
        tema: "Motor",
        nivel: 1,
        pergunta: "Qual a função principal do motor de um carro?",
        resposta: "Transformar combustível em movimento.",
        explicacao: "O motor queima gasolina, etanol ou diesel e transforma essa energia em força que gira as rodas. É o “coração” do carro.",
        imagem: null,
        fonte: "Princípios básicos de motores de combustão interna"
    },
    {
        id: "motor-02",
        tema: "Motor",
        nivel: 1,
        pergunta: "O que são os 4 tempos de um motor a gasolina?",
        resposta: "Admissão → Compressão → Combustão → Escape.",
        explicacao: "1) Entra ar + combustível, 2) Comprime, 3) Explode e empurra o pistão, 4) Joga os gases para fora.",
        imagem: null,
        fonte: "Ciclo Otto"
    },
    {
        id: "cambio-01",
        tema: "Câmbio",
        nivel: 1,
        pergunta: "Para que serve o câmbio (caixa de marchas)?",
        resposta: "Adaptar a força do motor às diferentes velocidades.",
        explicacao: "Em subida usa marcha baixa (mais força). Em estrada usa marcha alta (mais velocidade).",
        imagem: null,
        fonte: "Fundamentos de transmissão veicular"
    },
    {
        id: "freios-01",
        tema: "Freios",
        nivel: 1,
        pergunta: "Como a maioria dos carros freia hoje?",
        resposta: "Com sistema hidráulico + pastilhas e discos (ou tambores).",
        explicacao: "Ao pisar no pedal, o fluido aperta as pastilhas contra o disco. O atrito transforma movimento em calor e para o carro.",
        imagem: null,
        fonte: "Sistemas de freio hidráulico"
    },
    {
        id: "suspensao-01",
        tema: "Suspensão",
        nivel: 1,
        pergunta: "Qual a função principal da suspensão?",
        resposta: "Absorver impactos e manter as rodas no chão.",
        explicacao: "Molas e amortecedores suavizam buracos, dão conforto e ajudam o carro a ficar estável.",
        imagem: null,
        fonte: "Princípios de suspensão veicular"
    },

    // ========== NÍVEL 2 – INTERMEDIÁRIO ==========
    {
        id: "motor-03",
        tema: "Motor",
        nivel: 2,
        pergunta: "Qual a diferença entre motor aspirado e motor turbo?",
        resposta: "O turbo força mais ar para dentro do motor, gerando mais potência.",
        explicacao: "No aspirado o ar entra sozinho. No turbo um compressor (movido pelos gases de escape) empurra mais ar, permitindo queimar mais combustível.",
        imagem: null,
        fonte: "Sobrealimentação de motores"
    },
    {
        id: "cambio-02",
        tema: "Câmbio",
        nivel: 2,
        pergunta: "O que é um câmbio CVT?",
        resposta: "Câmbio que muda a relação de forma contínua, sem “degraus” de marcha.",
        explicacao: "Usa polias e correia/corrente. A troca é suave e sem trancos, comum em carros modernos.",
        imagem: null,
        fonte: "Transmissões continuamente variáveis (CVT)"
    },
    {
        id: "freios-02",
        tema: "Freios",
        nivel: 2,
        pergunta: "Para que serve o ABS?",
        resposta: "Evitar que as rodas travem e o carro derrape na freada forte.",
        explicacao: "O ABS aperta e solta o freio várias vezes por segundo. Assim você continua conseguindo dirigir mesmo freando forte.",
        imagem: null,
        fonte: "Sistema antibloqueio de freios (ABS)"
    },
    {
        id: "suspensao-02",
        tema: "Suspensão",
        nivel: 2,
        pergunta: "O que é suspensão independente?",
        resposta: "Cada roda sobe e desce sozinha, sem afetar a outra.",
        explicacao: "Melhora o contato com o solo, o conforto e a estabilidade em curvas. É o padrão dos carros atuais.",
        imagem: null,
        fonte: "Evolução dos sistemas de suspensão"
    },
    {
        id: "transmissao-01",
        tema: "Transmissão",
        nivel: 2,
        pergunta: "O que a embreagem faz no câmbio manual?",
        resposta: "Liga e desliga a força do motor para a caixa de marchas.",
        explicacao: "Quando você pisa na embreagem, o motor fica temporariamente separado da caixa. Assim dá para trocar de marcha sem tranco.",
        imagem: null,
        fonte: "Funcionamento da embreagem"
    },

    // ========== NÍVEL 3 – AVANÇADO ==========
    {
        id: "motor-04",
        tema: "Motor",
        nivel: 3,
        pergunta: "O que significa “downsizing” com turbo?",
        resposta: "Motores menores que, com turbo, entregam a potência de motores maiores e gastam menos.",
        explicacao: "A indústria reduziu o tamanho dos motores e colocou turbo. Resultado: mesma potência (ou mais) com menos consumo e poluição.",
        imagem: null,
        fonte: "Tendências de downsizing"
    },
    {
        id: "cambio-03",
        tema: "Câmbio",
        nivel: 3,
        pergunta: "Qual a vantagem do câmbio de dupla embreagem (DCT)?",
        resposta: "Trocas de marcha muito rápidas e sem interrupção de força.",
        explicacao: "Tem duas embreagens. Enquanto uma marcha está engatada, a próxima já está pronta. A troca é quase instantânea.",
        imagem: null,
        fonte: "Transmissões de dupla embreagem (DCT/DSG)"
    },
    {
        id: "freios-03",
        tema: "Freios",
        nivel: 3,
        pergunta: "O que o EBD faz junto com o ABS?",
        resposta: "Distribui a força de frenagem entre as rodas de forma inteligente.",
        explicacao: "Ajusta a força de freio em cada roda conforme a carga e a aderência. Melhora a estabilidade e reduz a distância de parada.",
        imagem: null,
        fonte: "Distribuição eletrônica de frenagem (EBD)"
    },
    {
        id: "suspensao-03",
        tema: "Suspensão",
        nivel: 3,
        pergunta: "O que é suspensão adaptativa?",
        resposta: "Sistema que ajusta a dureza dos amortecedores em tempo real.",
        explicacao: "Sensores leem o piso e o jeito de dirigir. Os amortecedores ficam mais moles (conforto) ou mais firmes (esportivo) em milissegundos.",
        imagem: null,
        fonte: "Suspensões controladas eletronicamente"
    },
    {
        id: "transmissao-02",
        tema: "Transmissão",
        nivel: 3,
        pergunta: "Como funciona a transmissão na maioria dos carros elétricos?",
        resposta: "Geralmente tem só uma marcha (redução fixa).",
        explicacao: "O motor elétrico entrega força desde zero. Por isso a maioria dos elétricos não precisa trocar de marcha.",
        imagem: null,
        fonte: "Arquitetura de transmissão em veículos elétricos"
    }
];