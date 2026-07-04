<template>
  <footer class="footer-fintech poppins-regular">
    <div class="footer-container">
      
      <div class="footer-brand">
        <h2 class="poppins-bold">GRUPO <span class="accent">7</span></h2>
        <p>Transformando narrativas em experiências digitais memoráveis.</p>
        <div class="social-icons">
          <span class="material-symbols-outlined">share</span>
          <span class="material-symbols-outlined">language</span>
        </div>
      </div>

      <div class="footer-links">
        <h3 class="poppins-semibold">Navegação</h3>
        <ul>
          <li v-for="item in menuItems" :key="item.label">
            <a @click="scrollTo(item.id)">{{ item.label }}</a>
          </li>
        </ul>
      </div>

      <div class="footer-contact">
        <h3 class="poppins-semibold">Contato</h3>
        <div class="contact-wrapper">
          <div class="contact-item">
            <span class="material-symbols-outlined">call</span>
            <div class="contact-info">
              <p class="label">Telefone / WhatsApp</p>
              <p class="value">+55 (11) 95363-2306</p>
            </div>
          </div>
          <div class="contact-item">
            <span class="material-symbols-outlined">mail</span>
            <div class="contact-info">
              <p class="label">E-mail</p>
              <p class="value">evertonmarussi@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <div class="bottom-container">
        <p>&copy; 2026 Grupo 7. Todos os direitos reservados.</p>
        <div class="legal-links">
          <a>Termos de Uso</a>
          <a>Privacidade</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterFintech',
  data() {
    return {
      menuItems: [
        { label: 'Motivação', id: 'motivacao' },
        { label: 'História', id: 'historia' },
        { label: 'Missão', id: 'missao' },
        { label: 'O Time', id: 'time' },
        { label: 'Contato', id: 'contato' }
      ]
    };
  },
  methods: {
    scrollTo(id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
/* Estilização Geral */
.footer-fintech {
  background-color: #080808;
  color: #f1f5f9;
  padding: 80px 0 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px 60px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Colunas iguais para centralização perfeita */
  gap: 40px;
}

/* Coluna 1: Branding (Esquerda) */
.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinha conteúdo à esquerda */
  text-align: left;
}

.footer-brand h2 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #fff;
}

.footer-brand .accent {
  color: #39ff14;
}

.footer-brand p {
  color: #94a3b8;
  max-width: 300px;
  line-height: 1.6;
  font-size: 14px;
}

.social-icons {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  color: #64748b;
}

/* Coluna 2: Links (Centro) */
.footer-links {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza a coluna no PC */
  text-align: center;
}

.footer-links h3, .footer-contact h3 {
  font-size: 16px;
  color: #fff;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #39ff14;
}

/* Coluna 3: Contato (Direita) */
.footer-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Alinha coluna à direita no PC */
  text-align: right;
}

.contact-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end; /* Ícones acompanham o texto à direita */
}

.contact-item span {
  color: #39ff14;
  font-size: 24px;
}

.contact-info .label {
  font-size: 11px;
  color: #a1a7af;
  text-transform: uppercase;
  margin: 0;
}

.contact-info .value {
  font-size: 15px;
  color: #f1f5f9;
  margin: 0;
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 30px 24px;
  background: rgba(0, 0, 0, 0.1);
}

.bottom-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #64748b;
}

.legal-links {
  display: flex;
  gap: 24px;
}

/* --- RESPONSIVIDADE --- */

@media (max-width: 1024px) {
  .footer-container {
    gap: 20px;
  }
}

@media (max-width: 900px) {
  /* No tablet, removemos o alinhamento lateral e centralizamos tudo */
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 50px;
  }

  .footer-brand, .footer-links, .footer-contact {
    align-items: center;
    text-align: center;
  }

  .footer-brand p {
    margin: 0 auto;
  }

  .contact-item {
    justify-content: center;
    text-align: left; /* Mantém ícone e texto alinhados entre si */
  }

  .contact-wrapper {
      align-items: center;
  }

  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .bottom-container {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .legal-links {
    justify-content: center;
  }
}

.poppins-regular { font-family: 'Poppins', sans-serif; font-weight: 400; }
.poppins-semibold { font-family: 'Poppins', sans-serif; font-weight: 600; }
.poppins-bold { font-family: 'Poppins', sans-serif; font-weight: 700; }
</style>