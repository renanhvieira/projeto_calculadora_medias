const form = document.getElementById('form-atividade');
/*Colocar as imagens para aparecer na aprovacao e reprovacao. Depois de feita a const, colocar na linha de comparacao da média da nota 19*/
const imgAprovado = '<img src="./aprovado.png" alt="emoji Celebrando"/>';
const imgReprovado = '<img src="./reprovado.png" alt="emoji decepcionado"/>';
const atividades = [];       /*Array de atividades*/
const notas = [];     /* Array de notas*/
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima"));

/*Para adicionar uma linha depois de colocado os conteudos. minuto 09 da aula 4 */ 
let linhas = ''; /*para conseguir colocar mais linhas e nao voltar ao submeter os dados, a variavel foi coloca no niVel GLOBAL */

form.addEventListener('submit', function (e) {
    e.preventDefault(); /*Para tirar o carregamento da página*/

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();

})

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade'); /*variavel do nome da atividade*/
    const inputNotaAtividade = document.getElementById('nota-atividade'); /*variavel da NOTA da atividade*/

    /*Impedir que coloque o mesmo nome nos campos da atividade*/
    if (atividades.includes(inputNomeAtividade.value)){
        alert (`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        /*toda vez que o adicionaLinha for chamado, sera colocado no array declarado lá em cima, através do PUSH do comando abaixo*/
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
        /*o parseInt e parseFlot foi colocado para que os valores sejam declarados como numeros e nao como strings como estava antes*/

        /*adicionar a atividade e nota e aprovacao NO CORPO da tabela*/
        let linha = '<tr>';
        linha += `<td> ${inputNomeAtividade.value}</td>`;   /*O += é um contatenacao, para diminuir o código e juntar Linha e o valor do INPUT */
        linha += `<td> ${inputNotaAtividade.value}</td>`;
        linha += `<td> ${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado} </td>`; /*o ? significa o IF positivo, caso aprovada. o : sifnifica ELSE, reprovado*/
        linha += `</tr>`;

        linhas += linha; /*concatenar as linhaS com as variaveis LINHA */
    }

    /*Limpar o campo após colocar o conteúdo*/
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela () {
    const corpoTabela = document.querySelector('tbody');  /*Colocar este conteúdo no corpo da tabela, usa QUERY*/
    corpoTabela.innerHTML = linhas;    /*inserir conteúdo dentro de uma TAG = INNERHTML*/
}


function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    /*Calcular a média, é feita um laço descrito na linha LET E FOR */
    let somaDasNotas =0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}