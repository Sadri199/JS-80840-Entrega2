## Checklist entrega (por ahora lo subo, después lo escondo)

[ ] - Evaluar Javascript, ver que se puede mejorar, que se saca.
    [x] - Cambio de arrays a Clases en los stats, items, enemigos, todo.
    [x] - Que datos se guardan en local? Stats? Items?
    [x] - Funciones de Orden Superior (Find, Filter)
    [ ] -  (Opcional) Danger level (nuevo counter, para agregar enemigos a la lista de posibles encuentros, podría aumentar drop a medida que sube) Sería la dificultad. 
    [ ] -  (Opcional) Implementación de Math.random() en donde amerite. Encuentros, criticos, dropeo de gold e items. roundup y rounddown para no trabajar con floats.
    [ ] -  (Opcional) Health System, ya no recupera vida cuando termina una pelea. Sistema con pociones y tal vez una fuente (encuentro random). 
    [ ] -  (Opcional) Tienda, si hay oro hay alguien que venda items, que compre items también. Posible sistema de regateo. 
    [x] - Console.log migra a eventos, principalmente click y tengo que evaluar si permito escritura o si hago todo click.
    [ ] - (Opcional) Modo Debug, Regenerar HP, dar Items, dar Oro, lo que sea.
    [ ] -  (Opcional) Fight cambiarlo a Action, dinámico el texto del botón, en base al evento (del juego) que esté pasando 
    [ ] -  (Opcional) Inventory va a tener que permitir dos acciones, Equip y Use (nueva, para curarse)
    [ ] - Goodbye va a tener un botón exit, al hacer click preguntar si se borran los datos de local o no (continuar partida) 
    [ ] -  (Opcional) No se puede modularizar, pero si puedo tener diferentes js 
    
[ ] - Maquetear html, pensar como se va a ver la web.
    [x] - Arranca con una pantalla dando la bienvenida, pide nombre con un input y submit. Guarda nombre en localStorage.
    [x] - p, grande, donde todo lo que se pasa en console log se va a pasar ahí (excepto lo debug).
    [x] - Inventory va a ser un botón, luego tengo que evaluar si pide texto o si agrega items con otros botones.
    [x] - Fight va a ser un botón, podria ser dinámico en base a lo que esté pasando (encontras una tienda, un enemigo).
    [ ] - (Opcional) Cómo represento los diferentes eventos? La tienda habrá que escribir o presionar un botón?
    [ ] - (Opcional)  Botones debug, activados mediante algún keypress medio raro (pensar una palabra clave). Invisibles hasta que se active ese evento.
    [ ] - Gameover, tanto bueno como malo, misma página o guarda en local, hace un get, en base a los datos los devuelve en una nueva página que te permite borrar todo para comenzar de nuevo??????????????
    
[ ] - Maquetear CSS, 
    [ ] - Flex o Box ??????
    [ ] - Qué fuente?
    [ ] - Qué paleta de colores?
    [ ] - Tamaños de textArea, Input y Botones. Cómo lo quiero tener armado?
    [ ] - (Opcional)  Debug, tiene que estar display hidden con una clase, cuando se activa evento cambia a la clase con display inline?
    [ ] -  (Opcional) Animaciones?? por ejemplo un cambio de backgroundColor tipo degrade cuando se ataca, cuando se recibe daño, cuando se cura
    
[x] - Tiene clases?
[x] - Guarda algo en LocalStorage? Get de LocalStorage? Remove y Clear de LocalStorage?
[x] - Eventos funcionan correctamente?

    