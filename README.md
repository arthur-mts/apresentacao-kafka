# Introdução ao Kafka

[send-kafka-message](https://github.com/ifood-jhonatan-andrade/send-kafka-message)

## Instalação
Instale o docker e o docker compose em sua máquina.
Execute o comando:
```bash
docker compose up -d
```

dentro da pasta desse repositório.  
Esse comando irá subir essas três imagens:
- zookeper
- red-panda
- kafka-broker
- red-panda

### Zookeper
É o serviço que está acima do broker Kafka e gerencia todos os clusters.  
No momento não vamos usar ele diretamente.

### Red Panda
O Red Panda é um cliente gráfico gratuito para manusear nosso tópicos Kafka.
Podemos criar tópicos, acompanhar eles e etc.

Ele esta acessível na URL [http://localhost:8080/overview](http://localhost:8080/overview)

### Kafka Broker
Onde as partições e os eventos estão guardados.  
É aqui que vamos publicar/consumir mensagens na URL [localhost:8081](localhost:8081)
### Conexão pelo terminal
Para entrarmos no terminal do container do broker executamos esse comando:
```bash
docker compose exec kafka bash
```

Apos isso, podemos usar esse comando para listar os tópicos criados:
```sh
kafka-topics --list --bootstrap-server localhost:9092
```

Dentre outros comandos.

### Schema-Registry
É o serviço responsável por guardar e gerenciar os schemas dos nossos tópicos.  
Ele esta acessível na URL [http://localhost:8081](http://localhost:8081)
  
Deixei um arquivo schema_registry_collection.json nesse repositório que pode ser importado no [Postman](https://www.postman.com/) com requests prontas pra criar/editar os seus schemas.

## Comandos

### Criar contexto para enviar mensagem
```bash
python3 main.py context --context context01 \
--schema-registry-url http://localhost:8081 \
--kafka-server localhost:9092
```

### Enviar mensagem
```bash
python3 main.py publish \
 --context context01 \
 --topic my-first-topic \
 --key id \
 --path-schema avro.avsc \
 --path-message message.json \
 --alias send-message-topic \
 --save
```