import React from 'react';
import './App.css';
import CardGrande from './components/CardGrande/CardGrande';
import CardPequeno from './components/CardPequeno/CardPequeno';
import CardConhecimentos from './components/CardConhecimentos/CardConhecimentos';
import ImagemButton from './components/ImagemButton/ImagemButton';
import profilePicture from './images/foto-perfil.jpg';
import logoEmail from './images/email.svg';
import logoEndereco from './images/endereco.svg';
import iconeCincoEstrelas from './images/cinco-estrelas.svg';
import iconeQuatroEstrelas from './images/quatro-estrelas.svg';
import iconeTresEstrelas from './images/tres-estrelas.svg';

function App() {

  return (
    <div className="App">
      <div className="page-section-container">
        <h2>Dados pessoais</h2>
        <CardGrande 
          imagem={profilePicture} 
          nome="Anna Fernandes" 
          descricao="Sou designer gráfico com experiência na área editorial e da comunicação. Há dois anos, estou migrando para o design digital. Atualmente, estudo para ser fullstack developer e user research. "
        />
        
        <ImagemButton 
          imagem="https://image.flaticon.com/icons/png/512/117/117472.png" 
          texto="Ver mais"
        />
      </div>

      <div className="page-section-container">
        <CardPequeno 
          icone={logoEmail} 
          tipoInformacao="Email"
          informacao="annafernandes@labenu.com"
        />
        <CardPequeno 
          icone={logoEndereco}  
          tipoInformacao="Endereço"
          informacao="Rua das Margaridas, 1200/1504"
        />
      </div>

      <div className="page-section-container">
        <h2>Experiências profissionais</h2>
        <CardGrande 
          imagem="https://media-exp1.licdn.com/dms/image/C4E0BAQGYlZFlGCWuCA/company-logo_200_200/0?e=1600300800&v=beta&t=Xl-neMBnv_pDZqvsXUJ1sVpS4jTkedvjwq4zt-_2h54" 
          nome="Grupo RBS" 
          descricao="Fui diagramadora dos jornais Diário Gaúcho e Zero Hora. Em 2018, fui promovida a webdesigner da Editoria de Arte, para trabalhar com design digital da plataforma GaúchaZH." 
        />
        <CardGrande 
          imagem="https://lh3.googleusercontent.com/proxy/2FRq-3UukIgnJHpf5agFx6g0XZ8rUmPZwXCuSCMHsijw3JiWDKwfcSZA8itmhqi951df_noenM54UyaT8qp0KGhdmQzFP99Y7-2mPMM7hJhdE3guU2s" 
          nome="Feed Marketing e Conteúdo" 
          descricao="Desenvolvi projetos gráficos e diagramei cadernos comerciais do Grupo Sinos." 
        />
      </div>

      <div className="page-section-container">
        <h2>Formação</h2>
        <CardGrande 
          imagem="https://media-exp1.licdn.com/dms/image/C560BAQGXX-pQE9ZghQ/company-logo_100_100/0?e=1600300800&v=beta&t=E1ZmSnFH6r5kvMnpm2dlkphcnf1gOCkhxqoxPdEuDe4" 
          nome="Labenu" 
          descricao="Fullstack Developer. 2020" 
        />
        <CardGrande 
          imagem="https://media-exp1.licdn.com/dms/image/C560BAQEe-XddVYMIUg/company-logo_100_100/0?e=1600300800&v=beta&t=Zyjs8C4m20ESjVP6-A1lS0cy_Xp1DEnAu7jNBy7pPDA" 
          nome="Ebac" 
          descricao="User research (online). 2020" 
        />
        <CardGrande 
          imagem="https://media-exp1.licdn.com/dms/image/C4E0BAQF3vNuQdKRNdw/company-logo_100_100/0?e=1600300800&v=beta&t=ZlH0a4Of07HOGY8uYfKs5m3x0ILlgzi8qxwGxal6jtQ" 
          nome="UFRGS" 
          descricao="Mestrado em História. Foco em Estudos de Gênero. 2014-2016" 
        />
        <CardGrande 
          imagem="https://media-exp1.licdn.com/dms/image/C4D0BAQFX9ZMDKw_SSA/company-logo_100_100/0?e=1600300800&v=beta&t=buYY_NpzeNx0DD-cK8OHwsbZAJuYj_Ie9HikP8f6SNg" 
          nome="UFRGS" 
          descricao="Bacharelado em Comunicação – Jornalismo. 2004-2013" 
        />
        <CardGrande 
          imagem="https://media-exp1.licdn.com/dms/image/C4E0BAQF3vNuQdKRNdw/company-logo_100_100/0?e=1600300800&v=beta&t=ZlH0a4Of07HOGY8uYfKs5m3x0ILlgzi8qxwGxal6jtQ" 
          nome="UFRGS" 
          descricao="Bacharelado em História. 2005-2010" 
        />
      </div>

      <div className="page-section-container">
        <h2>Conhecimentos básicos</h2>
        <CardConhecimentos 
          icone={iconeCincoEstrelas}
          area="Inglês"
          descricao="Avaçado"
        />
        <CardConhecimentos 
          icone={iconeCincoEstrelas}
          area="Illustrator"
          descricao="Avaçado"
        />
        <CardConhecimentos 
          icone={iconeCincoEstrelas}
          area="Html"
          descricao="Avaçado"
        />
        <CardConhecimentos 
          icone={iconeCincoEstrelas}
          area="Css"
          descricao="Avaçado"
        />
        <CardConhecimentos 
        icone={iconeQuatroEstrelas}
        area="Adobe XD"
        descricao="Intermediário"
        />
        <CardConhecimentos 
          icone={iconeTresEstrelas}
          area="Javascript"
          descricao="Intermediário"
        />
      </div>

      <div className="page-section-container">
        <h2>Minhas redes sociais</h2>
        <div className="social-media-btns">
        <ImagemButton 
          href="https://www.facebook.com/anna.cretelli/"
          imagem="https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png" 
          texto="Facebook" 
        />        

        <ImagemButton 
          href="https://twitter.com/AnnaCretelli"
          imagem="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png" 
          texto="Twitter" 
        />           
        </div>
      </div>
    </div>
  );
}

export default App;
