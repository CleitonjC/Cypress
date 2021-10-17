
describe("Tickets", () =>{
    beforeEach(() => cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html'));
   
    //it.only executa apenas o primeiro teste
    //----TESTE COM CAMPO INPUT----
    it("fills all the text input fields", () => {
        const firstName = "Joao";
        const lastName = "Campos";

        //campo para interagir(get(campo) e valor (type))
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("cleitonjc1@outlook.com");
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    //----TESTE COM CAMPO SELECT-----
    //teste de seleção de campo de opções 
    it("select three tickets", () =>{
        cy.get("#ticket-quantity").select("3")
    });

    //-----TESTE DE RADIO BUTTONS-----

    //selecionou o radio button vip
    it("select 'vip' ticket type", () =>{
        cy.get("#vip").check();
    });

    //-----TESTE DE CHECKBOX-----

    //selecionou a opção social media
    it("selects 'social media' checkbox", () =>{
        cy.get("#social-media").check();
    });

    //seleciontou friend, publication e depois desmarcou o campo friend
    it("selects 'friend', and 'publication', then uncheck 'friend'", () =>{
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    //teste para identificar se o elemento ticketbox existe na header da pagina dentro da h1
    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
});

    //-----TESTE DE VERIFICAÇÕES(ASSERTIONS)------
    //---identificar email invalido---

    it("alerts on invalid email", () => {
        cy.get("#email")
            .as("email")//aliás email que chama o #email
            .type("cleitonjc1-outlook.com");
        
            //chama o id email e diz q ele é invalido e que ele existe nessa campo
        cy.get("#email.invalid").should("exist");

        //chamou o aliás do #email (o arroba diz que é um aliás)
        cy.get("@email")
            .clear()//limpa o campo que contém o email invalido
            .type("cleitonjc1@outlook.com");//digita o email válido

            //chama o id email invalido e fala que ele nao pode existir nesse campo
        cy.get("#email.invalid").should("not.exist");
    });

    //---TESTE END TO END - VERIFICAÇÃO PARA PREENCHER E RESETAR FORMULATIO ----

    it("fills and reset the form", () =>{
        const firstName = "Joao";
        const lastName = "Campos";
        const fullName = `${firstName} ${lastName}`;
        // ${} concatena duas constantes

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("cleitonjc1@outlook.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#social-media").check();
        cy.get("#requests").type("IPA bear");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        //o click vai clicar na opção(parecido com check)
        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        //verfica o botão de confirmar do formulário
        cy.get("button[type = 'submit']")
        .as("submitButton") //aliás que chama o submit
        .should("not.be.disabled"); //não pode estar desabilitado
        
        //clica no botão reset
        cy.get("button[type ='reset']").click();
        
        //verifica que o botão ta desabilitado
        cy.get("@submitButton").should("be.disabled");
    });

    //---COMANDOS CUSTOMIZADOS----
    it("fills mandatory fields using support command", () => {
        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "joaosilva@example.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type = 'submit']")
            .as("submitButton")
            .should("not.be.disabled");
        
        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
        
    });
});


