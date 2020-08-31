import axios from "axios";

const baseUrl: string = 'https://us-central1-labenu-apis.cloudfunctions.net/labenews';

// 3.
type Subscriber = {
    id: string,
    name: string,
    email: string
}

// Função que retorna todos os assinantes
// 1.a axios.get
// 1.b  Array<any> ou any[]
// 1.c / 2.b
const getAllSubscribers = async(): Promise<Subscriber[]> => {
    const subscribers = await axios.get(`${baseUrl}/subscribers/all`);
    return subscribers.data.map( (subscriber: Subscriber) => {
        return {
            id: subscriber.id,
            name: subscriber.name,
            email: subscriber.email
        }
    });
}

// 2.a Em uma função nomeada, o async ficaria a frente dela ( async function... ), enquanto na arrow function, ele fica após a declaração da variável.

// 3.a Sim, ela vai esperar um retorno da função
// 3. b Porque a função espera o retorno de algum dado, e com o mapeamento, conseguimos controlar o que deve ser retornado

// 4.a função assíncrona com axios.post
// 4.b 
const createNews = async(title: string, content: string, date: number = Date.now()): Promise<void> => {
    await axios.put(`${baseUrl}/news`, {
        title,
        content,
        date
    })
}

// 7.a
const createSubscriber = async(name: string, email: string): Promise<void> => {
    await axios.put(`${baseUrl}/subscribers`, {
        name,
        email
    })
}


// 7.b



const sendNotification = async(subscriber: Subscriber, message: string): Promise<void> => {
    await axios.post(`${baseUrl}/notifications/send`, {
        subscriberId: subscriber.id,
        message
    });
}

// 7.c

type Notification = {
    id: string,
    subscriberId: string,
    message: string
}

const getNotificationsBySubscriberId = async(subscriberId: string): Promise<Notification[]> => {
    const response = await axios.get(`${baseUrl}/subscribers/${subscriberId}/notifications/all`);
    return response.data.map( (notification: Notification) => {
        return {
            subscriberId: notification.subscriberId,
            message: notification.message
        }
    });
}

const main = async() => {
    try {
        console.log("Criando uma notícia")
        await createNews( 'Outro Título', 'Mais um Bla bla bla', 1598540400);
        
        // console.log("Criando usuário")
        // await createSubscriber( 'Gertrudes', 'gertrudes@labenu.com');

        const subscribers = await getAllSubscribers();
        console.log("Listando os assinantes:")
        console.log(subscribers)
        
        
        // 5a. Poderia dar problema, pois é forEach, map e filter não são funções criadas para serem assíncronas. Nesse caso, é recomendável usar for loops.
        const promisesArray = [];

        for( const subscriber of subscribers) {
            promisesArray.push(sendNotification(subscriber, "Outra mensagem"))
        }
        console.log("Listando os as notificações")
        console.log(promisesArray)

        // 6.a Promise.all retorna todas as promise de uma vez
        // 6. b No caso de enviar todas as notificações, a função não retornaria um por um
        // 6. c
        await Promise.all(promisesArray);

        const notificationsArray = [];

        for( const subscriber of subscribers) {
            notificationsArray.push(getNotificationsBySubscriberId(subscriber.id))
        }
        const promisseAllResult = await Promise.all(notificationsArray);
        console.log("Listando as notificações recebidas pelos assinantes:")
        console.log(promisseAllResult)

    } catch(err) {
        console.log(err.response.data)
    }
}

main();