document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obter os valores inseridos pelo usuário
    const consumoEnergia = parseFloat(document.getElementById('energia').value);
    const consumoAgua = parseFloat(document.getElementById('agua').value);
    const pagamentoEnergia = document.getElementById('pagamentoEnergia').value;
    const pagamentoAgua = document.getElementById('pagamentoAgua').value;

    // Calcular a pontuação com base no consumo
    let pontuacao = 0;
    
    // Atribuir pontos com base no consumo de energia
    if (consumoEnergia <= 100) {
        pontuacao += 100;  // Baixo consumo de energia
    } else if (consumoEnergia <= 200) {
        pontuacao += 50;   // Consumo médio de energia
    } else {
        pontuacao += 10;   // Alto consumo de energia
    }

    // Atribuir pontos com base no consumo de água
    if (consumoAgua <= 10) {
        pontuacao += 100;  // Baixo consumo de água
    } else if (consumoAgua <= 20) {
        pontuacao += 50;   // Consumo médio de água
    } else {
        pontuacao += 10;   // Alto consumo de água
    }

    // Verificar se o pagamento foi feito no prazo e atribuir pontos extras
    if (pagamentoEnergia === "sim") {
        pontuacao += 50;  // Pontos extras por pagamento de energia no prazo
    }
    
    if (pagamentoAgua === "sim") {
        pontuacao += 50;  // Pontos extras por pagamento de água no prazo
    }

    // Exibir resultados
    document.getElementById('pontuacao').textContent = pontuacao;

    // Definir benefícios com base na pontuação
    let beneficios = "";
    if (pontuacao >= 300) {
        beneficios = "Desconto de 30% na fatura de energia e água!";
    } else if (pontuacao >= 200) {
        beneficios = "Desconto de 20% na fatura de energia e água.";
    } else if (pontuacao >= 100) {
        beneficios = "Desconto de 10% na fatura de energia e água.";
    } else {
        beneficios = "Sem benefícios no momento.";
    }

    document.getElementById('beneficios').textContent = beneficios;

    // Mostrar o resultado
    document.getElementById('resultado').classList.remove('hidden');

    // Gerar gráficos com Chart.js
    gerarGraficos(consumoEnergia, consumoAgua, pontuacao);
});

function gerarGraficos(consumoEnergia, consumoAgua, pontuacao) {
    // Gráfico de Consumo (Energia e Água)
    const ctxConsumo = document.getElementById('graficoConsumo').getContext('2d');
    new Chart(ctxConsumo, {
        type: 'bar',
        data: {
            labels: ['Energia (kWh)', 'Água (m³)'],
            datasets: [{
                label: 'Consumo',
                data: [consumoEnergia, consumoAgua],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Pontuação
    const ctxPontuacao = document.getElementById('graficoPontuacao').getContext('2d');
    new Chart(ctxPontuacao, {
        type: 'line',
        data: {
            labels: ['Pontuação'],
            datasets: [{
                label: 'Pontuação do Usuário',
                data: [pontuacao],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 350
                }
            }
        }
    });
}
