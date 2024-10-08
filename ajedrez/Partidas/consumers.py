import json
from channels.generic.websocket import AsyncWebsocketConsumer

class PartidasConsumer(AsyncWebsocketConsumer):
    jugadas = {}
    
    async def connect(self):
        room_id = self.scope['url_route']['kwargs']['id']
        username = str(self.scope['user'])
        self.room_name = f'room_{username}'
        self.room_group_name = f'partida_{room_id}'
        
        print("room id: ", room_id)
        print(f"conexion iniciada para usuario: {username}")

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()

        text_data=json.dumps({
            'type':'conexion_establecida',
            'message':f'Conexion WebSocket establecida',
        })

        await self.send(text_data)
    
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )
    

    #(2) recibe un json con datos del cliente
    async def receive(self, text_data):
        datos_deserializados = json.loads(text_data)
        mensaje = datos_deserializados['message']
        tipo = datos_deserializados['type']
        print(f"metodo receive ejecutado, type: {tipo} // consumidor: {self.scope['user']}")

        contexto = {
            'type': tipo,
            'message': mensaje,
        }

        if tipo == 'mensaje_de_usuario':
            username = datos_deserializados['username']
            contexto['username'] = username
            
        await self.channel_layer.group_send(self.room_group_name, contexto)
    
    
    #(3) maneja mensajes con type "mensajeDeUsuario"
    async def mensaje_de_usuario(self, contexto):
        mensaje = contexto['message']
        username_emisor = contexto['username']

        print(f"metodo mensaje_de_usuario ejecutado: {mensaje} / consumidor asociado a: {self.scope['user']}")
        
        mensajeMarcado = f'{username_emisor}: {mensaje}'
        json_contexto_actualizado = json.dumps({
            "type": "mensaje_de_usuario",
            "message": mensajeMarcado,
            "username": username_emisor,
        })

        await self.send(text_data=json_contexto_actualizado)
    
    
    async def validacion_de_jugada(self, contexto):
        jugada = contexto['message']['jugada']
        color = contexto['message']['color']
        rolUsuario = contexto['message']['rolUsuario']
        print(f"metodo validacion_de_jugada ejecutado, consumidor asociado a: {self.scope['user']}")

        json_contexto = json.dumps({
            'message': {
                "jugada": jugada,
                "rolUsuario": rolUsuario,
                "color": color,
                },
            'type':'validacion_de_jugada',
        })

        await self.send(text_data=json_contexto)
        
        
    async def finalizacion_de_partida(self, contexto):
        motivo = contexto['message']['motivo']
        color_ganador = contexto['message']['color_ganador'] if (motivo == 'mate') else None
        color_perdedor = contexto['message']['color_perdedor'] if (motivo == 'mate') else None
        print(f"metodo finalizacion_de_partida ejecutado, consumidor asociado a: {self.scope['user']}")

        json_contexto = json.dumps({
            'message': {
                "motivo": motivo,
                "color_ganador": color_ganador,
                "color_perdedor": color_perdedor,
                },
            'type':'finalizacion_de_partida',
        })

        await self.send(text_data=json_contexto)
        
        
    
    
    