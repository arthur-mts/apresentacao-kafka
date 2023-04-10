const {Kafka} = require('kafkajs')
const {SchemaRegistry} = require('@kafkajs/confluent-schema-registry')

async function main(consumerGroup, consumerIdx) {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092'],
    })
    const registry = new SchemaRegistry({host: 'http://localhost:8081/'})
    const consumer = kafka.consumer({groupId: consumerGroup})
    await consumer.subscribe({topic: 'my-first-topic', fromBeginning: true})


    let consumedMessages = 0;
    await consumer.run({
        eachMessage: async ({topic, message, partition}) => {
            const key = message.key.toString()
            const decodedValue = await registry.decode(message.value)
            consumedMessages += 1
            let log = `${consumerGroup} => ${decodedValue.name} || ${consumedMessages} mensagens consumidas`;
            if (consumerIdx) {
                log = `${consumerGroup}(${consumerIdx}) => ${decodedValue.name} || ${consumedMessages} mensagens consumidas`;
            }
            console.log(log)
        }
    })
}

//Exemplo de vários grupos consumindo mensagens em paralelo
// for (let i = 0; i < 2; i++) {
//     (() => main(`consumer${i}`))()
// }

// Varios consumidores em um mesmo grupo consumindo as mesmas mensagens
// for (let i = 1; i < 3; i++) {
//     (() => main(`consumerP`, i))()
// }

