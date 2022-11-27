import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Image, TextInput} from 'react-native';//Componentes que utilizaré
import { useEffect, useState } from 'react'; 
import image from 'speech-to-text-app/assets/UN.png';
import Voice from '@react-native-voice/voice';
import Images from './assets/importarImagenes.js';
//  RECORDAR PROCESAR LAS ñ Y CAMBIARLAS POR n- 
export default function App() {
  let [started, setStarted] = useState(false);//variable de estado que me permte saber si estoy grabando
  let [results, setResults] = useState([]);//con esto se veran los resultados en texto como un arreglo
  let [rutas, setRutas] = useState([]);//variable de estado para cambiar de ruta
  let [fuente, setFuente] = useState("conector_espera.jpg");//tengo esta por ahora porque me pide un valor estatico
  let [desabilitarBoton, setDesabilitarBoton] = useState(false); //esta variable de estado permite desabilitar el boton mientras se ejecutan las señas

  //A continuacion se crean arreglos con las palabras existentes en lengua de señas para encontrar las rutas
  const a = ["abajo.jpg","abandonar.jpg","abanico.jpg","abarcar.jpg","abofetear.jpg","abonar.jpg","abono.jpg","aborto.jpg","abraham.jpg","abreviar.jpg","abrigo.jpg","abril.jpg","abrir_cortina.jpg","absorber.jpg","abstracto.jpg","abuelo.jpg","abuelo_v.jpg","aburrido.jpg","abuso.jpg","abuso_sexual.jpg","acabar.jpg","acariciar.jpg","accion_de_gracias.jpg","aceite.jpg","acelerar.jpg","acento.jpg","aceptar.jpg","acera.jpg","acercar.jpg","acercarse.jpg","acido.jpg","acido_nucleico.jpg","aclaracion.jpg","acne.jpg","acolitos.jpg","acomodar.jpg","acompan-ar.jpg","acosar.jpg","acoso_sexual.jpg","acostarse.jpg","acta.jpg","actitud.jpg","actual.jpg","acuario.jpg","acuatico.jpg","acunar.jpg","acurrucar.jpg","adan.jpg","adaptacion.jpg","adelantar.jpg","adherir.jpg","adhesion.jpg","adhesivo.jpg","adiestrar.jpg","adios.jpg","adiposa.jpg","adjetivo.jpg","adjetivo_calificativo.jpg","adjetivo_superlativo.jpg","adjuntar.jpg","administracion_de_empresas.jpg","admirar.jpg","admitir.jpg","adobar.jpg","adopcion.jpg","adoptar.jpg","adorable.jpg","adoracion.jpg","adorar.jpg","adormilar.jpg","adulto.jpg","adverbio.jpg","advertir.jpg","aereos.jpg","afan.jpg","afiche.jpg","afiliado.jpg","afrontar.jpg","agarrar.jpg","agentes.jpg","agosto.jpg","agotado.jpg","agotar.jpg","agregar.jpg","agua.jpg","agua_chica.jpg","agua_de_dios.jpg","aguacate.jpg","aguacero.jpg","aguadas.jpg","agustin_codazzi.jpg","ahi_esta.jpg","ahora.jpg","aji.jpg","ajo.jpg","ajustar.jpg","al_contrario.jpg","al_lado.jpg","al_lado_de_v.jpg","ala.jpg","alabanza.jpg","alba.jpg","albania.jpg","alcala.jpg","alcalde.jpg","alcaldia.jpg","alcanzar.jpg","alcanzar_a_alguien.jpg","alcanzar_algo.jpg","alcanzar_el_puntaje.jpg","alcoba.jpg","alcoholismo.jpg","alerta.jpg","aletas.jpg","alfabeto.jpg","algebra.jpg","algodon.jpg","algunos.jpg","alimentador.jpg","alimento_espiritual.jpg","alisar.jpg","aliviar.jpg","alla.jpg","alma.jpg","almacen.jpg","almeja.jpg","almidon.jpg","almohada.jpg","almojabana.jpg","almuerzo.jpg","alojar.jpg","altar.jpg","alterado.jpg","alternativa.jpg","alto.jpg","aluminio.jpg","alumno.jpg","alvarado.jpg","alveolos.jpg","alza.jpg","amable.jpg","amalfi.jpg","amanecer.jpg","amante.jpg","amargo.jpg","amarillo.jpg","amasar.jpg","ambicioso.jpg","ambientador.jpg","ambon.jpg","ameba.jpg","amenaza.jpg","america.jpg","amigdala.jpg","amigo.jpg","amigo_v.jpg","amonestar.jpg","amor.jpg","amorosa.jpg","amos.jpg","amperimetro.jpg","amplificacion.jpg","ampollas.jpg","amputar.jpg","anafase.jpg","anapoima.jpg","anaranjado.jpg","anatomia.jpg","ancho.jpg","anciano.jpg","androi.jpg","andropausia.jpg","anelidos.jpg","anestesiologo.jpg","anfibio.jpg","angiospermas.jpg","angostura.jpg","angulo.jpg","angulo_adyacente.jpg","angulo_agudo.jpg","angulo_complementario.jpg","angulo_consecutivo.jpg","angulo_convexo.jpg","angulo_de_giro.jpg","angulo_llano.jpg","angulo_obtuso.jpg","angulo_recto.jpg","angulos_opuestos_por_el_vertice.jpg","angulos_suplementarios.jpg","anidacion.jpg","animal.jpg","animales.jpg","animo.jpg","an-o.jpg","antena.jpg","antepenultima_silaba.jpg","antes.jpg","antes_de.jpg","antes_de_ayer.jpg","antifaz.jpg","antioquia.jpg","antologia.jpg","antonimo.jpg","antropologo.jpg","anual.jpg","anunciacion.jpg","aparato.jpg","aparato_de_golgi.jpg","apartado.jpg","apartamento.jpg","apartamento_v.jpg","apenas.jpg","aplaudir_oyentes.jpg","aplaudir_sordos.jpg","apocalipsis.jpg","apoyar.jpg","aprender.jpg","apretado.jpg","aprovechado.jpg","aprovechar.jpg","apulo.jpg","aqui.jpg","aracnidos.jpg","aran-a.jpg","aratoca.jpg","arbitro.jpg","arbol.jpg","arcilla.jpg","area.jpg","area_lateral.jpg","arepa.jpg","argumentacion.jpg","armenia.jpg","arn.jpg","aroma.jpg","aromatica.jpg","arrastrar.jpg","arreglar.jpg","arrendar.jpg","arrepentimiento.jpg","arriba.jpg","arriesgar.jpg","arroba.jpg","arroz.jpg","arruga.jpg","arrugada.jpg","arrugado.jpg","articulacion_biologia.jpg","articulacion_castellano.jpg","articulo.jpg","artropodos.jpg","arveja.jpg","arzobispo.jpg","asaltar.jpg","asamblea.jpg","ascencion_de_jesus.jpg","ascender.jpg","asexual.jpg","asfixia.jpg","asignar.jpg","asistir.jpg","asma.jpg","asociacion.jpg","asombrar.jpg","aspiracion.jpg","aspiradora.jpg","asquelmintos.jpg","astrologo.jpg","astronauta.jpg","asumir_a_dios.jpg","asunto.jpg","asustarse.jpg","atencion.jpg","atmosfera.jpg","atomo.jpg","atraccion.jpg","atrapar.jpg","atrasado.jpg","atrevido.jpg","audicion.jpg","auditiva.jpg","auditor.jpg","aula.jpg","aurora.jpg","automatico.jpg","autonomo.jpg","autopista.jpg","autopista_v.jpg","autor.jpg","autoridad_de_dios.jpg","autorizar.jpg","autoservicio.jpg","auxiliar.jpg","avanzado.jpg","avanzar.jpg","avenida_v.jpg","aventura.jpg","aventura_sexual.jpg","aves.jpg","avion.jpg","avisar.jpg","aviso.jpg","axioma.jpg","ayer.jpg","ayer_BIG.jpg","ayuda.jpg","ayudar.jpg","azteca.jpg","azucar.jpg","azul.jpg"];
  const alfabeto = ["a.jpg",	"b.jpg",	"c.jpg",	"d.jpg",	"e.jpg",	"f.jpg",	"g.jpg",	"h.jpg",	"i.jpg",	"j.jpg",	"k.jpg",	"l.jpg",	"m.jpg",	"n.jpg",	"n-.jpg",	"o.jpg",	"p.jpg",	"q.jpg",	"r.jpg",	"s.jpg",	"t.jpg",	"u.jpg",	"v.jpg",	"w.jpg",	"x.jpg",	"y.jpg",	"z.jpg"];
  const b = ["babosa.jpg",	"bafle.jpg",	"bailar.jpg",	"bailarina.jpg",	"bajar.jpg",	"bajar_cortina.jpg",	"bajo.jpg",	"balanceo.jpg",	"balanza.jpg",	"balboa.jpg",	"ballena.jpg",	"ballet.jpg",	"baloncesto.jpg",	"banano.jpg",	"ban-ar.jpg",	"banco.jpg",	"bandera.jpg",	"banquete.jpg",	"banquitas.jpg",	"barato.jpg",	"barbero.jpg",	"barbosa.jpg",	"barrabas.jpg",	"barrancabermeja.jpg",	"barranquilla.jpg",	"barrer.jpg",	"base.jpg",	"basura.jpg",	"bautizado.jpg",	"bautizar.jpg",	"bautizo.jpg",	"bazo.jpg",	"bebe.jpg",	"becerril.jpg",	"becerro.jpg",	"belalcazar.jpg",	"belen.jpg",	"belen_de_los_andaquies.jpg",	"belen_de_umbria.jpg",	"belen_narin-o.jpg",	"belice.jpg",	"bendicion.jpg",	"benegnidad.jpg",	"betulia.jpg",	"biblia.jpg",	"bibliografia.jpg",	"biblioteca.jpg",	"bibliotecologo.jpg",	"bien.jpg",	"bienvenido.jpg",	"bigote.jpg",	"bilinguismo.jpg",	"bilirrubina.jpg",	"bilis.jpg",	"billete.jpg",	"billete_de_loteria.jpg",	"billetera.jpg",	"billones.jpg",	"bimestral.jpg",	"binomio.jpg",	"bioetica.jpg",	"biologia.jpg",	"biopsia.jpg",	"biosfera.jpg",	"biparticion.jpg",	"bipedos.jpg",	"bisilaba.jpg",	"bisturi.jpg",	"bizco.jpg",	"blanco.jpg",	"blanqueador.jpg",	"blasfemia.jpg",	"blusa.jpg",	"bobada.jpg",	"boca.jpg",	"bocadillo.jpg",	"bodega.jpg",	"bofetada.jpg",	"bogota.jpg",	"bojaca.jpg",	"boleta.jpg",	"bolivar.jpg",	"bolivar_ns.jpg",	"bolivar_vc.jpg",	"bolo_alimenticio.jpg",	"bolsa.jpg",	"bolso.jpg",	"bomba.jpg",	"bomba_de_aire.jpg",	"bombardear.jpg",	"bondad.jpg",	"bonita.jpg",	"borrador.jpg",	"bosconia.jpg",	"botas.jpg",	"botella.jpg",	"botiquin.jpg",	"boton_accesesorio.jpg",	"boton_maquina.jpg",	"branquias.jpg",	"brassier.jpg",	"bravo.jpg",	"brazo.jpg",	"brillante.jpg",	"bromear.jpg",	"bronquiolos.jpg",	"bronquios.jpg",	"brujo.jpg",	"brujula.jpg",	"bucaramanga.jpg",	"bucear.jpg",	"buen_pastor.jpg",	"buena_persona.jpg",	"buena_vista.jpg",	"buena_vista_q.jpg",	"buenas.jpg",	"bueno.jpg",	"buenos.jpg",	"bulbo.jpg",	"bulbo_olfatorio.jpg",	"bulto.jpg",	"bun-uelo.jpg",	"burgos.jpg",	"burro.jpg",	"buscar.jpg",	"buseta.jpg", "buzo.jpg"];
  const c = ["caballero.jpg",	"caballo.jpg",	"cabello.jpg",	"cabeza.jpg",	"cabra.jpg",	"cabrera.jpg",	"cachucha.jpg",	"cada_uno.jpg",	"cadena.jpg",	"caer.jpg",	"cafe.jpg",	"caicedonia.jpg",	"caja.jpg",	"caja_toracica.jpg",	"cajamarca.jpg",	"cajon.jpg",	"cal.jpg",	"calamar.jpg",	"calambre.jpg",	"calarca.jpg",	"calcio.jpg",	"calcular.jpg",	"calculo_mental.jpg",	"caldas.jpg",	"caldereta.jpg",	"caldo.jpg",	"cali.jpg",	"caliente.jpg",	"califa.jpg",	"calificacion.jpg",	"calificar.jpg",	"caliz.jpg",	"calle.jpg",	"calorica.jpg",	"calvo.jpg",	"calzones.jpg",	"cama_matrimonial.jpg",	"cama_sencilla.jpg",	"camara.jpg",	"camara_profesional.jpg",	"camaron.jpg",	"camarones.jpg",	"cambiar.jpg",	"camello.jpg",	"camilla.jpg",	"caminan.jpg",	"caminar.jpg",	"camisa.jpg",	"camiseta.jpg",	"campana.jpg",	"campeon.jpg",	"campeonato.jpg",	"campo_de_la_cruz.jpg",	"cana.jpg",	"canada.jpg",	"canasta.jpg",	"cancer.jpg",	"canciller.jpg",	"candado.jpg",	"candelabro.jpg",	"candelaria.jpg",	"candelero.jpg",	"candidato.jpg",	"caneca.jpg",	"cangrejo.jpg",	"canguro.jpg",	"canino.jpg",	"canoso.jpg",	"cansado.jpg",	"cantar.jpg",	"cantidad.jpg",	"capas_de_la_tierra.jpg",	"capilar.jpg",	"capital.jpg",	"capitanejo.jpg",	"capitulo.jpg",	"cara.jpg",	"caracol.jpg",	"caracter.jpg",	"carcasi.jpg",	"cardiologo.jpg",	"carga.jpg",	"cargo.jpg",	"caribe.jpg",	"caridad.jpg",	"carne.jpg",	"carnicero.jpg",	"caro.jpg",	"carpeta.jpg",	"carrera.jpg",	"carreras.jpg",	"carro.jpg",	"carta.jpg",	"cartagena.jpg",	"cartagena_de_indias.jpg",	"cartelera.jpg",	"cartilaginoso.jpg",	"cartuchera.jpg",	"casa.jpg",	"casa_de_campo.jpg",	"casa_de_tres_pisos.jpg",	"casa_v.jpg",	"casado.jpg",	"cascara.jpg",	"casi.jpg",	"cassette.jpg",	"castilla_la_nueva.jpg",	"casulla.jpg",	"catecumeno.jpg",	"catetos.jpg",	"catolico.jpg",	"caucho.jpg",	"causa.jpg",	"causar_placer.jpg",	"cebolla.jpg",	"cebolla_larga.jpg",	"ceja.jpg",	"celador.jpg",	"celebrar.jpg",	"celenteros.jpg",	"celoma.jpg",	"celoso.jpg",	"celula.jpg",	"celula_eucariotica.jpg",	"celula_muscular.jpg",	"celula_nerviosa.jpg",	"celula_piramidal.jpg",	"celula_procariota.jpg",	"celular.jpg",	"cenicero.jpg",	"centiarea.jpg",	"centigrados.jpg",	"centigramo.jpg",	"centilitro.jpg",	"centimetro.jpg",	"centimetro_cubico.jpg",	"centralismo.jpg",	"centro.jpg",	"centroamerica.jpg",	"cepillo.jpg",	"cepillo_de_dientes.jpg",	"cepillo_de_ropa.jpg",	"cerca.jpg",	"cerca_de_aqui_v.jpg",	"cerca_v.jpg",	"cerco.jpg",	"cerdo.jpg",	"cerebro.jpg",	"cerrito.jpg",	"cerveza.jpg",	"cesarea.jpg",	"chachagui.jpg",	"champin-ones.jpg",	"champu.jpg",	"chapeton.jpg",	"chaqueta.jpg",	"charala.jpg",	"charity_day.jpg",	"charta.jpg",	"Chef.jpg",	"chima.jpg",	"chimichagua.jpg",	"chinacota.jpg",	"chinchina.jpg",	"chinu.jpg",	"chispa.jpg",	"chistoso.jpg",	"chivo.jpg",	"choachi.jpg",	"choco.jpg",	"chocolate.jpg",	"choconta.jpg",	"cianobacterias.jpg",	"ciclo.jpg",	"ciego.jpg",	"cienaga.jpg",	"cientifico.jpg",	"cimitarra.jpg",	"cinco_meses.jpg",	"cine.jpg",	"cinematografo.jpg",	"cinetica.jpg",	"cinta_pegante.jpg",	"circasia.jpg",	"circuito.jpg",	"circuito_de_serie.jpg",	"circuito_paralelo.jpg",	"circulatorio.jpg",	"circunferencia.jpg",	"circunferencia_concentrica.jpg",	"circunferencia_excentrica.jpg",	"cirugia.jpg",	"cirujano.jpg",	"cisneros.jpg",	"cita_bibliografica.jpg",	"cita_textual.jpg",	"citoplasma.jpg",	"civil.jpg",	"civismo.jpg",	"clan.jpg",	"claro.jpg",	"clase.jpg",	"clase_de_conjuntos.jpg",	"clases_sociales.jpg",	"clima_de_sabana.jpg",	"clima_polar.jpg",	"clima_subtropical.jpg",	"clima_tropical.jpg",	"clip.jpg",	"clip_mariposa.jpg",	"clitoris.jpg",	"clorofila.jpg",	"club.jpg",	"coagulacion.jpg",	"cobija.jpg",	"cocina.jpg",	"coco.jpg",	"cocodrilo.jpg",	"cocorna.jpg",	"codigo.jpg",	"coello.jpg",	"coger.jpg",	"colaboracion.jpg",	"coleccionar.jpg",	"colectivo.jpg",	"colega_v.jpg",	"colegio.jpg",	"coloca_entre.jpg",	"colocar_entre.jpg",	"coloidal.jpg",	"colombia.jpg",	"colon.jpg",	"colonia.jpg",	"colonizador.jpg",	"colorear.jpg",	"colores.jpg",	"colorete.jpg",	"colosenses.jpg",	"columna.jpg",	"columna_vertebral.jpg",	"coma.jpg",	"combinacion.jpg",	"comedia.jpg",	"comedor.jpg",	"comensalismo.jpg",	"comenzar.jpg",	"comer.jpg",	"comida.jpg",	"comision.jpg",	"comision_de_comite.jpg",	"como.jpg",	"como_esta.jpg",	"como_quiera.jpg",	"compan-ero.jpg",	"compan-ero_de_infancia.jpg",	"comparar.jpg",	"compas.jpg",	"complemento.jpg",	"completo.jpg",	"comportamiento.jpg",	"comprar.jpg",	"comprensibilidad.jpg",	"comprension.jpg",	"compromiso.jpg",	"compuesto.jpg",	"computador.jpg",	"computadores.jpg",	"comulgar.jpg",	"comunero.jpg",	"comunicacion.jpg",	"comunicador_social.jpg",	"comunidad.jpg",	"comunidad_religiosa.jpg",	"comunion.jpg",	"con1.jpg",	"concepcion.jpg",	"conceptual.jpg",	"conciencia.jpg",	"concilio.jpg",	"concordato.jpg",	"concreto.jpg",	"concupiscencia.jpg",	"concurso.jpg",	"condecorar.jpg",	"conducta.jpg",	"conducto_biliar.jpg",	"conejo.jpg",	"conferencia.jpg",	"confesion.jpg",	"confianza.jpg",	"confirmacion.jpg",	"confirmar.jpg",	"conflicto.jpg",	"confrontar.jpg",	"confuso.jpg",	"congelar.jpg",	"congestion_de_vehiculos.jpg",	"conjuncion.jpg",	"conjunto.jpg",	"conjunto_lleno.jpg",	"conjunto_por_compresion.jpg",	"conjunto_por_extension.jpg",	"conjunto_unitario.jpg",	"conjunto_universal.jpg",	"conjunto_vacio.jpg",	"cono.jpg",	"conocer.jpg",	"conocido_v.jpg",	"consecutivo.jpg",	"conservacion.jpg",	"conservar_la_fe.jpg",	"consonante.jpg",	"constante_proporcional.jpg",	"constantinopla.jpg",	"constumbre.jpg",	"consuelo.jpg",	"consumidor.jpg",	"contado.jpg",	"contar.jpg",	"contemplar_a_dios.jpg",	"contemporaneo.jpg",	"contenido.jpg",	"contento.jpg",	"contexto.jpg",	"contiene.jpg",	"continuar.jpg",	"contralor.jpg",	"contrarreforma.jpg",	"copacabana.jpg",	"copon.jpg",	"coqueta.jpg",	"corazon.jpg",	"corazones.jpg",	"corbata.jpg",	"corchete.jpg",	"cordero_de_dios.jpg",	"cordoba.jpg",	"corintios.jpg",	"coromoro.jpg",	"corpus_christi.jpg",	"corpusculo_de_meisser.jpg",	"corpusculo_de_pacini.jpg",	"correa.jpg",	"correcto.jpg",	"correr.jpg",	"correspondencia.jpg",	"corriente.jpg",	"corroer.jpg",	"corrupcion.jpg",	"corte_constitucional.jpg",	"cosecha.jpg",	"cosencante.jpg",	"coseno.jpg",	"costa_rica.jpg",	"costumbre.jpg",	"cotangente.jpg",	"crecer.jpg",	"credito.jpg",	"credo.jpg",	"crema_de_dientes.jpg",	"crema_de_manos.jpg",	"cremallera.jpg",	"cristo.jpg",	"critica.jpg",	"criticar.jpg",	"cromoplastos.jpg",	"cromosomas.jpg",	"crucifijo.jpg",	"cruz.jpg",	"cruz_roja.jpg",	"cruza_a_la_izquierda_v.jpg",	"cruza_a_la_v.jpg",	"cuaderno.jpg",	"cuadrado_de_un_numero.jpg",	"cuadricula.jpg",	"cuadro.jpg",	"cuadrupedos.jpg",	"cuajada.jpg",	"cual.jpg",	"cual_1.jpg",	"cual_2.jpg",	"cual_3.jpg",	"cual_BIG.jpg",	"cual_de_los_dos.jpg",	"cualidad.jpg",	"cualquiera.jpg",	"cuando.jpg",	"cuantificadores.jpg",	"cuanto.jpg",	"cuaresma.jpg",	"cuarta.jpg",	"cuarto_horizontal.jpg",	"cuatro_meses.jpg",	"cuba.jpg",	"cubarral.jpg",	"cubrelecho.jpg",	"cucaracha.jpg",	"cuchilla.jpg",	"cucuta.jpg",	"cuello.jpg",	"cuero.jpg",	"cuerpo.jpg",	"cuerpo_del_libro.jpg",	"cuidado.jpg",	"culebra.jpg",	"culpa.jpg",	"cultural.jpg",	"cun-ado.jpg",	"cun-ado_v.jpg",	"curioso.jpg",	"curita.jpg",	"curso.jpg",	"curuba.jpg",	"curva.jpg",	"custodia.jpg",	"cutaneo.jpg"];
  const d = ["dan-ado.jpg",	"danza.jpg",	"dar.jpg",	"darse_cuenta.jpg",	"de.jpg",	"de_acuerdo.jpg",	"de_dia.jpg",	"de_noche.jpg",	"de_pronto.jpg",	"deber.jpg",	"deberes.jpg",	"debil.jpg",	"decada.jpg",	"decagono.jpg",	"decagramo.jpg",	"decalitro.jpg",	"decametro.jpg",	"decametro_cubico.jpg",	"decena.jpg",	"decente.jpg",	"decepcionado.jpg",	"decigramo.jpg",	"decilitro.jpg",	"decimetro.jpg",	"decimetro_cubico.jpg",	"decir.jpg",	"dedicacion.jpg",	"dedos.jpg",	"defensoria_del_pueblo.jpg",	"dejar.jpg",	"dejar_algo.jpg",	"delgado.jpg",	"delicadeza.jpg",	"demorar.jpg",	"denominador.jpg",	"densidad.jpg",	"dentadura.jpg",	"dentario.jpg",	"deportar.jpg",	"deporte.jpg",	"depredacion.jpg",	"deprimido.jpg",	"derechos.jpg",	"derivada.jpg",	"dermis.jpg",	"derrotar.jpg",	"desacuerdo.jpg",	"desafio.jpg",	"desarrollar.jpg",	"desayuno.jpg",	"descansa.jpg",	"descansar.jpg",	"descomposicion.jpg",	"descripcion.jpg",	"descubrir.jpg",	"desea.jpg",	"desgastar.jpg",	"deshidratacion.jpg",	"desicion.jpg",	"desigual.jpg",	"desinfectar.jpg",	"deslizar.jpg",	"desmayarse.jpg",	"desnudar.jpg",	"desobediente.jpg",	"desodorante.jpg",	"desordenar.jpg",	"despacio.jpg",	"despertar.jpg",	"despues.jpg",	"desvestirse.jpg",	"desvincularse.jpg",	"determinante.jpg",	"Deuteronomio.jpg",	"dia.jpg",	"diacono.jpg",	"diagonal.jpg",	"dialecto.jpg",	"dialogar.jpg",	"diametro.jpg",	"diarrea.jpg",	"dias.jpg",	"diastole.jpg",	"dibujar.jpg",	"dibulla.jpg",	"diciembre.jpg",	"dicipulo.jpg",	"dictado.jpg",	"didactico.jpg",	"dientes.jpg",	"dieresis.jpg",	"diferente.jpg",	"dificil.jpg",	"difusion.jpg",	"digestivo.jpg",	"digito.jpg",	"dignidad.jpg",	"dilatacion.jpg",	"dimensiones.jpg",	"dimutivo.jpg",	"dios.jpg",	"dios_esta_oculto.jpg",	"director.jpg",	"director_ejecutivo.jpg",	"discapacidad.jpg",	"discoteca.jpg",	"discrecion.jpg",	"discurso.jpg",	"dise_no.jpg",	"disen-ador.jpg",	"disen-ador_grafico.jpg",	"disgregacion.jpg",	"dispersar.jpg",	"distanciarse.jpg",	"disyunto.jpg",	"dividendo.jpg",	"divisible.jpg",	"division.jpg",	"divisor.jpg",	"divisores_de_un_numero.jpg",	"documento.jpg",	"dolor.jpg",	"dolorosos.jpg",	"domesticos.jpg",	"domingo.jpg",	"dominio_de_una_relacion.jpg",	"donde.jpg",	"donde_queda_v.jpg",	"donde_vives.jpg",	"dones.jpg",	"dormir.jpg",	"dos_meses.jpg",	"dos_puntos.jpg",	"doxologia.jpg",	"ductilidad.jpg",	"duele.jpg",	"dulce.jpg",	"duodeno.jpg",	"durazno.jpg",	"duro.jpg"];
  const e = ["ebullicion.jpg",	"eclipse.jpg",	"ecopetrol.jpg",	"ecosistema.jpg",	"ecuaciones.jpg",	"edad_contemporanea.jpg",	"edad_media.jpg",	"edad_moderna.jpg",	"edificio.jpg",	"editorial.jpg",	"educacion_virtual.jpg",	"EEUU.jpg",	"efesios.jpg",	"eficaz.jpg",	"eficiente.jpg",	"egoista.jpg",	"el.jpg",	"el_cairo.jpg",	"el_calvario.jpg",	"el_carmen_de_bolivar.jpg",	"el_dovio.jpg",	"el_general.jpg",	"el_guacamayo.jpg",	"el_oido.jpg",	"el_olfato.jpg",	"el_pen-ol.jpg",	"el_rosario.jpg",	"el_salvador_pais.jpg",	"el_tablon.jpg",	"el_tacto.jpg",	"elasticidad.jpg",	"elastico.jpg",	"electrica.jpg",	"electricista.jpg",	"electron.jpg",	"elefante.jpg",	"elegante.jpg",	"elegir.jpg",	"elemento.jpg",	"ella.jpg",	"ellas.jpg",	"ellos.jpg",	"ellos_dos.jpg",	"embalses.jpg",	"embarazo.jpg",	"embetunar.jpg",	"emblema.jpg",	"embobar.jpg",	"embolador.jpg",	"embrion.jpg",	"embudo.jpg",	"emigracion.jpg",	"emocionado.jpg",	"empalme.jpg",	"empanada.jpg",	"emparedado.jpg",	"empate.jpg",	"empezar.jpg",	"empleada_domestica.jpg",	"empleo.jpg",	"emprendetic.jpg",	"enamorar.jpg",	"encantar.jpg",	"encarnacion.jpg",	"encefalo.jpg",	"encendedor.jpg",	"encestador.jpg",	"encestar.jpg",	"enciclopedismo.jpg",	"encino.jpg",	"encontrar.jpg",	"encontrar_1.jpg",	"encontrar_2.jpg",	"encuentro_con_dios.jpg",	"enemigo.jpg",	"energia.jpg",	"energia_calorica.jpg",	"enero.jpg",	"enfermedad.jpg",	"enfermo.jpg",	"enflaquecer.jpg",	"enfrentar.jpg",	"enfrente.jpg",	"enganchar.jpg",	"enlace.jpg",	"ensalada.jpg",	"ensen-ame.jpg",	"ensen-ar.jpg",	"ensordecido.jpg",	"entender.jpg",	"entendimiento.jpg",	"entrar.jpg",	"entre_rios.jpg",	"entrecruzamiento.jpg",	"envigado.jpg",	"epidermis.jpg",	"epiglotis.jpg",	"epitelial.jpg",	"epitelio.jpg",	"equilibrio.jpg",	"equinodermos.jpg",	"equipaje.jpg",	"equipo.jpg",	"equivalente.jpg",	"equivocar.jpg",	"era.jpg",	"era_antropozoica.jpg",	"era_cuaternaria.jpg",	"era_geologica.jpg",	"eres.jpg",	"erizado.jpg",	"esbelta.jpg",	"escamas.jpg",	"escoger.jpg",	"escogida.jpg",	"escolastica.jpg",	"esconder.jpg",	"esconder_animales.jpg",	"esconder_cosas.jpg",	"esconder_personas.jpg",	"escribir.jpg",	"escritor.jpg",	"escuadra.jpg",	"escucha.jpg",	"escuchar.jpg",	"escuchar_a_dios.jpg",	"esfero.jpg",	"esofago.jpg",	"espacios.jpg",	"espagueti.jpg",	"espalda.jpg",	"espan-ol.jpg",	"especial.jpg",	"especialista.jpg",	"especie.jpg",	"espejo.jpg",	"esperar.jpg",	"espeso.jpg",	"espina.jpg",	"espinal.jpg",	"espinilla.jpg",	"espiracion.jpg",	"espiritu.jpg",	"espiritu_santo.jpg",	"esponja.jpg",	"esposa.jpg",	"esposas.jpg",	"esposo.jpg",	"esposo_BIG.jpg",	"esposo_v.jpg",	"esposos.jpg",	"esta.jpg",	"esta1.jpg",	"esta2.jpg",	"estadistica.jpg",	"estado.jpg",	"estallar.jpg",	"estamos.jpg",	"estampado.jpg",	"estampilla.jpg",	"estancar.jpg",	"estatica.jpg",	"estatua.jpg",	"estatuto.jpg",	"esteril.jpg",	"esternicleidomastoideo.jpg",	"esther.jpg",	"estola.jpg",	"estomago.jpg",	"estopa.jpg",	"estrategia.jpg",	"estren-imiento.jpg",	"estuche.jpg",	"estudiante.jpg",	"estudiar.jpg",	"estudio.jpg",	"estudio_cropologico.jpg",	"estudio_fisico.jpg",	"estufa.jpg",	"eterno.jpg",	"etica.jpg",	"etopeya.jpg",	"eucaristia.jpg",	"eva.jpg",	"evangelio.jpg",	"evaporacion.jpg",	"evidente.jpg",	"evitar.jpg",	"exacta.jpg",	"exagerar.jpg",	"examen.jpg",	"examen_medico.jpg",	"excremento.jpg",	"excretor.jpg",	"excretora.jpg",	"exhibicionista.jpg",	"exhibir.jpg",	"exodo.jpg",	"experto.jpg",	"explicar.jpg",	"exportar.jpg",	"exposicion.jpg",	"expresion.jpg",	"expresiones_algebraicas.jpg",	"expresivo.jpg",	"expulsar.jpg",	"extension.jpg",	"extran-ar.jpg",	"extranjerismo.jpg",	"extremidades.jpg",	"extremos_proporcionales.jpg"];
  const f = ["facatativa.jpg",	"facebook.jpg",	"facil.jpg",	"factor_rh.jpg",	"factores.jpg",	"factores_primos.jpg",	"factorizacion.jpg",	"falan.jpg",	"falda.jpg",	"falla.jpg",	"fallar.jpg",	"falso.jpg",	"falta.jpg",	"familia.jpg",	"famoso.jpg",	"fanatico.jpg",	"fanegada.jpg",	"fantasia.jpg",	"faringe.jpg",	"fariseos.jpg",	"faro.jpg",	"fascinar.jpg",	"fauna.jpg",	"fe.jpg",	"febrero.jpg",	"fecha.jpg",	"fecundacion.jpg",	"federacion.jpg",	"felicitaciones.jpg",	"felicitar.jpg",	"felipe_evangelista.jpg",	"feliz.jpg",	"feliz_cumplea_nos.jpg",	"feo.jpg",	"feria.jpg",	"fertil.jpg",	"festivo.jpg",	"ficha_bibliografica.jpg",	"fidelidad.jpg",	"fiebre.jpg",	"figura.jpg",	"figura_geometrica.jpg",	"filtracion.jpg",	"fin_de_mes.jpg",	"finca.jpg",	"fines_de_la_eucaristia.jpg",	"fino.jpg",	"firma.jpg",	"firme.jpg",	"fiscal.jpg",	"flaco.jpg",	"flandes.jpg",	"flecha.jpg",	"flexion.jpg",	"flojo.jpg",	"florencia.jpg",	"florero.jpg",	"flota.jpg",	"fluctuacion.jpg",	"fonema.jpg",	"forma.jpg",	"formal.jpg",	"formar.jpg",	"formas_de_locomocion.jpg",	"foro.jpg",	"fortaleza.jpg",	"forzar.jpg",	"foto_documento.jpg",	"fotocopiadora.jpg",	"fotosintesis.jpg",	"fracasado.jpg",	"fraccion_del_pan.jpg",	"fractura.jpg",	"fragil.jpg",	"fraile.jpg",	"frasco.jpg",	"frase.jpg",	"frecuencia.jpg",	"freno.jpg",	"frente.jpg",	"fresa.jpg",	"fresno.jpg",	"frio.jpg",	"frontera.jpg",	"frontino.jpg",	"frustado.jpg",	"fruta.jpg",	"fuera_del_comun.jpg",	"fuerte.jpg",	"funciones.jpg",	"funda.jpg",	"fundacion.jpg",	"fundacion_hetah.jpg",	"fundador.jpg",	"funes.jpg",	"funza.jpg",	"furioso.jpg",	"fusible.jpg",	"fusiforme.jpg",	"fusion.jpg",	"futbol.jpg",	"futuro.jpg"];
  const g = ["gabinete.jpg",	"gacheta.jpg",	"gafas.jpg",	"galan.jpg",	"galapa.jpg",	"galatas.jpg",	"galleta.jpg",	"gallina.jpg",	"gallo.jpg",	"galon.jpg",	"gamarra.jpg",	"gambita.jpg",	"ganancias.jpg",	"gancho.jpg",	"gancho_de_ropa.jpg",	"gancho_para_ropero.jpg",	"garaje.jpg",	"garrote.jpg",	"gas.jpg",	"gaseosa.jpg",	"gasolina.jpg",	"gato.jpg",	"gelatina.jpg",	"gemelos_v.jpg",	"gen.jpg",	"generoso.jpg",	"genesis.jpg",	"genotipo.jpg",	"genova.jpg",	"gente.jpg",	"gentilicio.jpg",	"geologia.jpg",	"geometria.jpg",	"gerundio.jpg",	"gimnacio.jpg",	"gimnasia.jpg",	"ginecologo.jpg",	"girardot.jpg",	"girardota.jpg",	"glande.jpg",	"glandulas.jpg",	"glandulas_paratiroides.jpg",	"glandulas_salivales.jpg",	"glandulas_sudoriparas.jpg",	"glandulas_suprarenales.jpg",	"glandulas_tiroides.jpg",	"globo_ocular.jpg",	"globulos.jpg",	"gloriosos.jpg",	"google.jpg",	"gordo.jpg",	"gorila.jpg",	"grabar_un_video.jpg",	"gracia.jpg",	"gracias.jpg",	"grado_fahrenheit.jpg",	"grados.jpg",	"grafema.jpg",	"grafica.jpg",	"grafica_de_barras.jpg",	"grafica_de_lineas.jpg",	"grafica_de_puntos.jpg",	"gramatica.jpg",	"gramo.jpg",	"granada.jpg",	"granadilla.jpg",	"grande.jpg",	"granivoros.jpg",	"grano.jpg",	"grasa.jpg",	"grasoso.jpg",	"gratis.jpg",	"grave.jpg",	"gravedad.jpg",	"greca.jpg",	"griego.jpg",	"grieta.jpg",	"grillo.jpg",	"gripa.jpg",	"gris.jpg",	"grito.jpg",	"grosero.jpg",	"guaca.jpg",	"guacari.jpg",	"guadalupe.jpg",	"guamal.jpg",	"guantes.jpg",	"guapo.jpg",	"guapota.jpg",	"guarne.jpg",	"guatica.jpg",	"guavata.jpg",	"guayaba.jpg",	"gusano.jpg",	"gusanos.jpg",	"gustar.jpg"];
  const h = ["habichuela.jpg",	"habitad.jpg",	"habla_mal_de.jpg",	"hablar.jpg",	"hace_poco.jpg",	"hace_poquito.jpg",	"hace_tiempo.jpg",	"hacer.jpg",	"hacer_el_amor.jpg",	"hacienda.jpg",	"hamaca.jpg",	"hambre.jpg",	"hay.jpg",	"hebreo.jpg",	"hectarea.jpg",	"hectogramo.jpg",	"hectolitro.jpg",	"hectometro.jpg",	"hectometro_cubico.jpg",	"heptagono.jpg",	"herbivoros.jpg",	"herejia.jpg",	"hermano.jpg",	"hermano_v.jpg",	"herodes.jpg",	"herpes.jpg",	"herramientas.jpg",	"hetah.jpg",	"hexagono.jpg",	"hiato.jpg",	"hiena.jpg",	"higado.jpg",	"higiene.jpg",	"hijo.jpg",	"hijo_v.jpg",	"hilum.jpg",	"himen.jpg",	"himno_nacional.jpg",	"hiperactivo.jpg",	"hiperbole.jpg",	"hipismo.jpg",	"hipoacusico.jpg",	"hipocausico.jpg",	"hipotenusa.jpg",	"hippie.jpg",	"histerectomia.jpg",	"historia.jpg",	"historieta.jpg",	"hogar.jpg",	"hojas.jpg",	"hola.jpg",	"hombre.jpg",	"hombro.jpg",	"homenaje.jpg",	"homosexual.jpg",	"hondo.jpg",	"honestidad.jpg",	"honrado.jpg",	"hora.jpg",	"hospital.jpg",	"hostia.jpg",	"hotel.jpg",	"hoy.jpg",	"huella_dactilar.jpg",	"huila.jpg",	"humanidad.jpg",	"humano.jpg",	"humilde.jpg",	"humus.jpg",	"huso_acromatico.jpg"];
  const i = ["ibague.jpg",	"icap.jpg",	"ICBF.jpg",	"ICFES.jpg",	"idea.jpg",	"identidad.jpg",	"idioma.jpg",	"iglesia.jpg",	"iglesia_domestica.jpg",	"igual.jpg",	"igualdad.jpg",	"ilustracion.jpg",	"imagen_de_dios.jpg",	"imaginacion.jpg",	"iman.jpg",	"imitar.jpg",	"impenetrabilidad.jpg",	"implicacion.jpg",	"imponer.jpg",	"importacion.jpg",	"importante.jpg",	"imposible.jpg",	"imposicion_de_manos.jpg",	"imprevisto.jpg",	"incapacitado.jpg",	"Incas.jpg",	"INCI.jpg",	"incisivos.jpg",	"inclusion.jpg",	"incognita.jpg",	"incoloro.jpg",	"incorporar.jpg",	"incubacion.jpg",	"incubadora.jpg",	"incumplir.jpg",	"indicativo.jpg",	"indice.jpg",	"indocumentado.jpg",	"inexacta.jpg",	"infarto.jpg",	"infinitivo.jpg",	"inflamable.jpg",	"informacion.jpg",	"ingeniero.jpg",	"Ingeniero_Civil.jpg",	"inicio.jpg",	"inmenso.jpg",	"inmiscuir.jpg",	"innovadora.jpg",	"innovadores.jpg",	"innovadores_de_america.jpg",	"inoloro.jpg",	"inquisicion.jpg",	"insaboro.jpg",	"inscripcion.jpg",	"insecticida.jpg",	"insectivoros.jpg",	"insectos.jpg",	"inseminacion.jpg",	"insolacion.jpg",	"INSOR.jpg",	"inspiracion.jpg",	"instinto.jpg",	"instinto_sexual.jpg",	"Instituto_de_Seguro_Sociales.jpg",	"insulto.jpg",	"inteligencia.jpg",	"inteligente.jpg",	"intencion.jpg",	"Interaccion.jpg",	"interdependencia.jpg",	"interes.jpg",	"interes_compuesto.jpg",	"interes_simple.jpg",	"interferir.jpg",	"interferir_cosas.jpg",	"Interferir_relaciones_personales.jpg",	"intermediario_indirecto.jpg",	"internado.jpg",	"internar.jpg",	"internet.jpg",	"interno.jpg",	"interponer.jpg",	"interpretar.jpg",	"interprete.jpg",	"interrumpir.jpg",	"interseccion.jpg",	"intestino_delgado.jpg",	"intestino_grueso.jpg",	"introduccion.jpg",	"inundacion.jpg",	"inutil.jpg",	"invadir.jpg",	"inventar.jpg",	"invento.jpg",	"inversion.jpg",	"inverso.jpg",	"invertebrados.jpg",	"investidura.jpg",	"invidente.jpg",	"invitame.jpg",	"invitar.jpg",	"involuntario.jpg",	"inyeccion.jpg",	"ipad.jpg",	"iphone.jpg",	"iris.jpg",	"irradiar.jpg",	"irrumpir.jpg",	"isaias.jpg",	"Islam.jpg",	"isquion.jpg",	"israel.jpg"];
  const j = ["jabalina.jpg", "jabon.jpg", "jaguar.jpg", "jamas.jpg", "jamundi.jpg", "jardin.jpg", "jardinero.jpg", "jaula.jpg", "jefe.jpg", "jefe_de_cocina.jpg", "jefe_v.jpg", "jerarquia_de_la_iglesia.jpg", "jeringa.jpg", "jerusalen.jpg", "jesus_maria.jpg", "jordan.jpg", "jose_padre_de_jesus.jpg", "josue.jpg", "joven.jpg", "joya_de_fantasia.jpg", "joyero.jpg", "juan_evangelista.jpg", "juanete.jpg", "jubilacion.jpg", "judas_tadeo.jpg", "judio.jpg", "jueves.jpg", "jugar.jpg", "jugar_cometa.jpg", "juicio_moral.jpg", "juicioso.jpg", "julio.jpg", "junio.jpg", "junta_directiva.jpg", "justicia.jpg", "justificar.jpg"];
  const k = ["kilogramo.jpg",	"kilolitro.jpg",	"kilometro.jpg",	"kilometro_cubico.jpg"];
  const l = ["la_celia.jpg",	"la_cruz.jpg",	"la_jagua_del_pilar.jpg",	"la_merced.jpg",	"la_mesa.jpg",	"la_palma.jpg",	"la_papa.jpg",	"la_paz.jpg",	"la_pintada.jpg",	"la_tebaida.jpg",	"la_union.jpg",	"la_union_vc.jpg",	"la_vega.jpg",	"la_virginia.jpg",	"la_vista.jpg",	"ladeado.jpg",	"ladear.jpg",	"ladrar.jpg",	"ladrillo.jpg",	"lagrima.jpg",	"lagrimeo.jpg",	"laico.jpg",	"lana.jpg",	"lapicero.jpg",	"lapiz.jpg",	"lapiz_labial.jpg",	"laser.jpg",	"latigo.jpg",	"latin.jpg",	"latinoamerica.jpg",	"latitud.jpg",	"lavadero.jpg",	"leal.jpg",	"lealtad.jpg",	"lebrija.jpg",	"leccion.jpg",	"leccionario.jpg",	"leche_condensada.jpg",	"lechuga.jpg",	"lector.jpg",	"leer.jpg",	"legua_maritima.jpg",	"legua_terrestre.jpg",	"lejanias.jpg",	"lejos.jpg",	"lejos_v.jpg",	"lengua.jpg",	"lengua_de_sen-as.jpg",	"lenguaje.jpg",	"lentes.jpg",	"lentes_divergentes.jpg",	"leopardo.jpg",	"leproso.jpg",	"lerida.jpg",	"les_pregunto.jpg",	"letra.jpg",	"letra_mayuscula.jpg",	"letra_minuscula.jpg",	"levantarse.jpg",	"lexema.jpg",	"lexico.jpg",	"libano.jpg",	"liberacion.jpg",	"libertad.jpg",	"libra.jpg",	"lider.jpg",	"limon.jpg",	"limosnero.jpg",	"limpiar.jpg",	"limpio.jpg",	"lindisimo.jpg",	"lindo.jpg",	"linea_curva.jpg",	"linfatico.jpg",	"linguista.jpg",	"lisosomas.jpg",	"lista.jpg",	"listo.jpg",	"litro.jpg",	"liturgia_de_la_palabra.jpg",	"llamado.jpg",	"llamame.jpg",	"llamar.jpg",	"llamar_a_larga_distancia.jpg",	"llamar_por_telefono.jpg",	"llamativo.jpg",	"llano.jpg",	"llanto.jpg",	"llanura.jpg",	"llave.jpg",	"llegar.jpg",	"llenar.jpg",	"llevar.jpg",	"llorar.jpg",	"llover.jpg",	"llovizna.jpg",	"lluvia.jpg",	"lo_digo_una_sola_vez.jpg",	"lo_siento.jpg",	"lobo.jpg",	"localizar.jpg",	"logaritmo.jpg",	"logica.jpg",	"longitud.jpg",	"los_invito.jpg",	"los_patios.jpg",	"los_santos.jpg",	"lotero.jpg",	"luminosos.jpg",	"luna_de_miel.jpg",	"lunes.jpg",	"luruaco.jpg",	"lustrabotas.jpg",	"lustrar.jpg",	"lustro.jpg",	"luto.jpg",	"luz.jpg"];
  const m = ["mac.jpg",	"machismo.jpg",	"macho.jpg",	"madre.jpg",	"madre_v.jpg",	"madrid.jpg",	"madrina.jpg",	"madrugada.jpg",	"madrugar.jpg",	"maestro_de_musica.jpg",	"magangue.jpg",	"magdalena.jpg",	"magia.jpg",	"magisterio.jpg",	"magnetismo.jpg",	"magnitud_proporcional.jpg",	"mahates.jpg",	"Mahoma.jpg",	"maicao.jpg",	"mal.jpg",	"mala_persona.jpg",	"malaga.jpg",	"malambo.jpg",	"maleabilidad.jpg",	"mama.jpg",	"mamatoco.jpg",	"mamiferos.jpg",	"mamografia.jpg",	"man-ana.jpg",	"mandarina.jpg",	"manejar.jpg",	"manejar_carro.jpg",	"mango.jpg",	"manifestacion.jpg",	"manipulacion_genetica.jpg",	"manipular.jpg",	"maniqui.jpg",	"manizales.jpg",	"mano.jpg",	"manta.jpg",	"mantel.jpg",	"manzana.jpg",	"manzanares.jpg",	"maparipan.jpg",	"maquillarse.jpg",	"maquina_de_afeitar.jpg",	"mar_negro.jpg",	"mar_rojo.jpg",	"maravilloso.jpg",	"marcador.jpg",	"mareo.jpg",	"margarita.jpg",	"maria.jpg",	"maria_la_baja.jpg",	"marioneta.jpg",	"marquetalia.jpg",	"marsella.jpg",	"martes.jpg",	"marulanda.jpg",	"marzo.jpg",	"masa.jpg",	"masaje.jpg",	"masturbacion_masculina.jpg",	"matas.jpg",	"matematicas.jpg",	"materia.jpg",	"matrimonio.jpg",	"maximo_comun_divisor.jpg",	"Mayas.jpg",	"mayo.jpg",	"mayonesa.jpg",	"mayor.jpg",	"mazamorra.jpg",	"mazorca.jpg",	"medalla.jpg",	"medellin.jpg",	"media.jpg",	"media_proporcional.jpg",	"mediatriz.jpg",	"medicamento.jpg",	"medicina_nuclear.jpg",	"medico.jpg",	"medida_cubica.jpg",	"medidas_agrarias.jpg",	"medidas_de_longitud.jpg",	"medidas_de_peso.jpg",	"medidas_de_superficie.jpg",	"medidas_de_temperatura.jpg",	"medidas_de_tiempo.jpg",	"medios_de_una_proporcion.jpg",	"medula_espinal.jpg",	"mejor.jpg",	"melgar.jpg",	"membrana.jpg",	"memoria.jpg",	"menos.jpg",	"menstruacion.jpg",	"mensual.jpg",	"mentir.jpg",	"mentiroso.jpg",	"menton.jpg",	"mercado.jpg",	"mercancia.jpg",	"mes.jpg",	"mesa_de_noche.jpg",	"mesetas.jpg",	"mesias.jpg",	"mesoamerica.jpg",	"meta.jpg",	"metafase.jpg",	"metamorfosis.jpg",	"metido.jpg",	"metodo.jpg",	"metodo_cientifico.jpg",	"metro_cuadrado.jpg",	"metro_cubico.jpg",	"mexico.jpg",	"mezcla.jpg",	"mi.jpg",	"microfilamento.jpg",	"miembros_de_la_iglesia.jpg",	"miercoles.jpg",	"migracion.jpg",	"milagro.jpg",	"miligramo.jpg",	"milimetro_cubico.jpg",	"milla.jpg",	"mimar.jpg",	"minimo_comun_multiplo.jpg",	"ministerio.jpg",	"ministerio_de.jpg",	"ministerio_de_ cultura.jpg",	"ministerio_de_comunicacion.jpg",	"ministerio_de_desarrollo.jpg",	"ministerio_de_educacion.jpg",	"ministerio_de_energia.jpg",	"ministerio_de_hacienda.jpg",	"ministerio_de_justicia.jpg",	"ministerio_de_relaciones_exteriores.jpg",	"ministerio_de_salud.jpg",	"ministerio_de_trabajo.jpg",	"ministerio_de_transito_y_transporte.jpg",	"ministro.jpg",	"minuendo.jpg",	"minuto.jpg",	"mio.jpg",	"miopia.jpg",	"miqueas.jpg",	"miriametro.jpg",	"miriametro_cubico.jpg",	"misericordia.jpg",	"mistrato.jpg",	"mitocondria.jpg",	"mitosis.jpg",	"moda.jpg",	"moda_medida.jpg",	"modelaje.jpg",	"modelo.jpg",	"mogotes.jpg",	"moises.jpg",	"mojar.jpg",	"molares.jpg",	"molecula.jpg",	"molestar.jpg",	"moluscos.jpg",	"mompos.jpg",	"Mongoles.jpg",	"mono.jpg",	"monomio.jpg",	"monosilaba.jpg",	"monoteismo.jpg",	"monstruo.jpg",	"monte_del_calvario.jpg",	"montenegro.jpg",	"mora.jpg",	"moral.jpg",	"morder.jpg",	"moreno.jpg",	"morfema.jpg",	"morfologia.jpg",	"morir.jpg",	"morral.jpg",	"mostrar.jpg",	"motora.jpg",	"mover.jpg",	"mucho.jpg",	"mucho_gusto.jpg",	"muerte.jpg",	"muerte_natural.jpg",	"mujer.jpg",	"multiplicacion.jpg",	"multiplos_de_gramo.jpg",	"multiplos_de_litro.jpg",	"multiplos_de_metro.jpg",	"multiplos_de_un_numero.jpg",	"multiplos_de_volumen.jpg",	"mun-eco.jpg",	"municipio.jpg",	"municipio_de_bello.jpg",	"musculo_cardiaco.jpg",	"musculo_deltoides.jpg",	"musculo_estriado.jpg",	"musculo_liso.jpg",	"musculo_mayor_pectoral.jpg",	"musculo_mentoniano.jpg",	"musculo_orbicular_de_los_labios.jpg",	"musculo_recto_superior.jpg",	"musculo_sartorio.jpg",	"musculo_trapecio.jpg",	"musculos_extensores_comunes_de_los_dedos.jpg",	"musica.jpg",	"mutaciones.jpg"];
  const n = ["nacer.jpg",	"nacimiento.jpg",	"nacionalismo.jpg",	"nacionalista.jpg",	"nada.jpg",	"nadan.jpg",	"nadar.jpg",	"naipe.jpg",	"naranja.jpg",	"narigon.jpg",	"nariguera.jpg",	"narin-o.jpg",	"nariz.jpg",	"natacion.jpg",	"natural.jpg",	"naturaleza.jpg",	"navidad.jpg",	"nazareth.jpg",	"nazismo.jpg",	"necesitar.jpg",	"nectar.jpg",	"negro.jpg",	"neira.jpg",	"neolitico.jpg",	"nervio.jpg",	"nervioso.jpg",	"neurona.jpg",	"neurona_bipolar.jpg",	"neurona_central.jpg",	"neutro.jpg",	"neutron.jpg",	"nevera.jpg",	"nicaragua.jpg",	"nieta_v.jpg",	"nieto.jpg",	"nieto_v.jpg",	"nin-o.jpg",	"nivel.jpg",	"no.jpg",	"no_alcanza.jpg",	"no_creo.jpg",	"no_importa.jpg",	"no_pertinencia.jpg",	"no_poder.jpg",	"no_renovables.jpg",	"no_repito.jpg",	"no_saber.jpg",	"no_sirve.jpg",	"noches.jpg",	"nocion.jpg",	"nombre.jpg",	"nonagono.jpg",	"nosotros.jpg",	"nosotros_1.jpg",	"nosotros_2.jpg",	"nosotros_dos.jpg",	"noticia.jpg",	"noticiero.jpg",	"novela.jpg",	"noviembre.jpg",	"novio.jpg",	"novio_v.jpg",	"nucleo.jpg",	"nudo.jpg",	"nuera.jpg",	"nuestro.jpg",	"nuevo.jpg",	"nuevo_testamento.jpg",	"nulidad_del_matrimonio.jpg",	"numerador.jpg",	"numero.jpg",	"numero_atomico.jpg",	"numero_decimal.jpg",	"numeros.jpg",	"numeros_complejos.jpg",	"numeros_enteros.jpg",	"numeros_fraccionarios.jpg",	"numeros_irracionales.jpg",	"numeros_naturales.jpg",	"numeros_primos.jpg",	"numeros_racionales.jpg",	"numeros_reales.jpg",	"numeros_romanos.jpg",	"nunca.jpg",	"nutrientes.jpg"];
  const numeros= ["catorce.jpg",	"cero.jpg",	"cien.jpg",	"ciento.jpg",	"cinco.jpg",	"cincomil.jpg",	"cincuenta.jpg",	"cuarenta.jpg",	"cuatro.jpg",	"cuatrocientos.jpg",	"cuatromil.jpg",	"diecinueve.jpg",	"dieciocho.jpg",	"dieciseis.jpg",	"diecisiete.jpg",	"diez.jpg",	"doce.jpg",	"dos.jpg",	"doscientos.jpg",	"dosmil.jpg",	"framenumfinal.jpg",	"mil.jpg",	"miles.jpg",	"millon.jpg",	"millones.jpg",	"novecientos.jpg",	"noventa.jpg",	"nueve.jpg",	"ochenta.jpg",	"ocho.jpg",	"ochocientos.jpg",	"once.jpg",	"quince.jpg",	"quinientos.jpg",	"seis.jpg",	"seiscientos.jpg",	"sesenta.jpg",	"setecientos.jpg",	"setenta.jpg",	"siete.jpg",	"trece.jpg",	"trecientos.jpg",	"treinta.jpg",	"tres.jpg",	"tresmil.jpg",	"uno.jpg",	"veinte.jpg"];
  const o = ["obedecer.jpg",	"obediente_a_dios.jpg",	"objetivo.jpg",	"objeto_agente.jpg",	"objeto_instrumento.jpg",	"objeto_paciente.jpg",	"obligacion.jpg",	"observar.jpg",	"obstreta.jpg",	"obstruccion_nasal.jpg",	"ocamote.jpg",	"ocan-a.jpg",	"oclusivo.jpg",	"octagono.jpg",	"octubre.jpg",	"ocupado.jpg",	"odio.jpg",	"oferta.jpg",	"oficina.jpg",	"ofrecer.jpg",	"ofrenda.jpg",	"oftalmologo.jpg",	"oiba.jpg",	"oido.jpg",	"oidores.jpg",	"oir.jpg",	"ojala.jpg",	"ojeras.jpg",	"ojos.jpg",	"olimpiada.jpg",	"olor.jpg",	"olvidar.jpg",	"omnivoros.jpg",	"ondas_de_polarizacion.jpg",	"operacionales.jpg",	"operador.jpg",	"opinar.jpg",	"optimista.jpg",	"oracion.jpg",	"oracion_afirmativa.jpg",	"oracion_desiderativa.jpg",	"oracion_dubitativa.jpg",	"oracion_enunciativa.jpg",	"oracion_exclamativa.jpg",	"oracion_interrogativa.jpg",	"orbita.jpg",	"orbita_ocular.jpg",	"orden.jpg",	"orden_sacerdotal.jpg",	"ordenar.jpg",	"oreja.jpg",	"organos.jpg",	"organos_genitales.jpg",	"orgulloso.jpg",	"origen.jpg",	"ortodoncista.jpg",	"ortografia.jpg",	"oscilacion.jpg",	"oscuro.jpg",	"osea.jpg",	"oseas.jpg",	"oso.jpg",	"ostra.jpg",	"otorrinolaringologo.jpg",	"otra_vez.jpg",	"otro.jpg",	"ovario.jpg",	"oviparos.jpg",	"ovispo.jpg",	"ovulacion.jpg",	"ovulos.jpg",	"oxidacion.jpg",	"oxigeno.jpg",	"oyente.jpg"];
  const p = ["paciencia.jpg",	"padre.jpg",	"padre_nuestro.jpg",	"padre_v.jpg",	"padres.jpg",	"padres_v.jpg",	"padrino.jpg",	"pagar.jpg",	"paila.jpg",	"pailitas.jpg",	"paipa.jpg",	"paisaje.jpg",	"pajaro.jpg",	"palabra.jpg",	"palabra_aguda.jpg",	"palabra_compuesta.jpg",	"palabra_dubitativa.jpg",	"palabra_esdrujula.jpg",	"palabra_grave.jpg",	"palabra_homofona.jpg",	"palabra_homografa.jpg",	"palabra_homonima.jpg",	"palabra_primitiva.jpg",	"palabra_simple.jpg",	"palabra_sobreesdrujula.jpg",	"palanca.jpg",	"paleolitico.jpg",	"palestina.jpg",	"palido.jpg",	"palma_del_socorro.jpg",	"palmar_de_varela.jpg",	"palmira.jpg",	"paludismo.jpg",	"pan.jpg",	"pana_v.jpg",	"panadero.jpg",	"pan-al.jpg",	"panela.jpg",	"pantalon.jpg",	"pantaloncillo.jpg",	"pantufla.jpg",	"papa.jpg",	"pa-pa.jpg",	"papaya.jpg",	"papel.jpg",	"papel_higienico.jpg",	"papilas.jpg",	"para.jpg",	"para_que.jpg",	"para_que_aprenda.jpg",	"paradero.jpg",	"paramecio.jpg",	"paramo.jpg",	"parar_transporte.jpg",	"parausia.jpg",	"parcial_de_orina.jpg",	"parecido.jpg",	"parenquima.jpg",	"parenquima_acuifero.jpg",	"parenquima_clorofilico.jpg",	"parenquimas_de_reserva.jpg",	"parentesis.jpg",	"paro_cardiado.jpg",	"paronimas.jpg",	"parpadeo.jpg",	"parpados.jpg",	"parque.jpg",	"parrafo.jpg",	"parrilla.jpg",	"partes_del_libro.jpg",	"participar.jpg",	"participio.jpg",	"partido_conservador.jpg",	"partido_de.jpg",	"partido_liberal.jpg",	"parto_vaginal.jpg",	"pasado.jpg",	"pasado_man-ana.jpg",	"pasaporte.jpg",	"pascua.jpg",	"pasta.jpg",	"pastilla.jpg",	"pasto.jpg",	"patacon.jpg",	"patagonia.jpg",	"pataleta.jpg",	"patena.jpg",	"pato.jpg",	"paz.jpg",	"pc_dos.jpg",	"pecado.jpg",	"pedagogica.jpg",	"pedazo.jpg",	"pedro.jpg",	"pegante.jpg",	"pegante_de_barra.jpg",	"pegante_liquido.jpg",	"pegar_cosas.jpg",	"peinilla.jpg",	"pelear.jpg",	"peligroso.jpg",	"pelo.jpg",	"pelota.jpg",	"peluqueria.jpg",	"pena_de_muerte.jpg",	"penar.jpg",	"pendulo.jpg",	"pene.jpg",	"penitencia.jpg",	"pen-ol.jpg",	"pensar.jpg",	"pensar_cosas.jpg",	"pensar_personas.jpg",	"pensilvania.jpg",	"pentagono.jpg",	"penultima_silaba.jpg",	"peor.jpg",	"pequen-ito.jpg",	"pequen-o.jpg",	"pera.jpg",	"perder.jpg",	"perdida_de_conocimiento.jpg",	"perdon.jpg",	"pereza.jpg",	"perezoso.jpg",	"perfecto.jpg",	"perforadora.jpg",	"perfume.jpg",	"perfume_de_mujer.jpg",	"perimetro.jpg",	"permiso.jpg",	"perro.jpg",	"perro_caliente.jpg",	"persona.jpg",	"persona_esteril.jpg",	"persona_pulida.jpg",	"personajes_de_la_biblia.jpg",	"perspectiva.jpg",	"pertenecer.jpg",	"pertenencia.jpg",	"peru.jpg",	"pesebre.jpg",	"pesimista.jpg",	"peso.jpg",	"pestan-a.jpg",	"petan-as.jpg",	"petroleo.jpg",	"pez.jpg",	"pi.jpg",	"picar.jpg",	"pie.jpg",	"piedras.jpg",	"piel_desnuda.jpg",	"pierna.jpg",	"pies.jpg",	"pijao.jpg",	"piloto.jpg",	"pin-a.jpg",	"pin-ata.jpg",	"pincel.jpg",	"pinchote.jpg",	"pinguino.jpg",	"pintar.jpg",	"pintor_artista.jpg",	"pintor_de_inmuebles.jpg",	"pintura.jpg",	"piojo.jpg",	"piramide.jpg",	"pirata.jpg",	"pivijay.jpg",	"piyama.jpg",	"pizza.jpg",	"plancha.jpg",	"plano.jpg",	"plano_cartesiano.jpg",	"plantas_cormofitas.jpg",	"plantas_espermatofitas.jpg",	"plantas_gimnospermas.jpg",	"plantas_monocotiledoneas.jpg",	"plaquetas.jpg",	"plasma.jpg",	"plata.jpg",	"platano.jpg",	"plato_magdalena.jpg",	"platon.jpg",	"playa.jpg",	"plomero.jpg",	"pluma.jpg",	"pluricelular.jpg",	"pobre.jpg",	"poco.jpg",	"poco_a_poco.jpg",	"poder.jpg",	"poeta.jpg",	"polea.jpg",	"poligono.jpg",	"polinomio.jpg",	"polisilaba.jpg",	"pollito.jpg",	"pollo.jpg",	"polonuevo.jpg",	"poltrona.jpg",	"ponedera.jpg",	"ponque.jpg",	"por_donde.jpg",	"por_el_medio.jpg",	"por_favor.jpg",	"por_la_man-ana.jpg",	"por_la_noche.jpg",	"por_la_tarde.jpg",	"por_que.jpg",	"porcion.jpg",	"portada.jpg",	"portatil.jpg",	"porteria.jpg",	"postulado.jpg",	"potencia_enesima.jpg",	"potenciacion.jpg",	"practicar.jpg",	"prado.jpg",	"preguntame.jpg",	"preguntar.jpg",	"premisa.jpg",	"premolares.jpg",	"preocupado.jpg",	"presbicia.jpg",	"presentar.jpg",	"presente.jpg",	"presidente.jpg",	"presion_atmosferica.jpg",	"prestar.jpg",	"primer_piso.jpg",	"primera_de_corintios.jpg",	"primero.jpg",	"primo.jpg",	"primo_v.jpg",	"principio.jpg",	"principio_etico.jpg",	"prisma.jpg",	"probabilidad.jpg",	"probar_alimentos.jpg",	"problema.jpg",	"producto_cartesiano.jpg",	"productor.jpg",	"profase.jpg",	"profesional.jpg",	"profesor.jpg",	"profesores.jpg",	"progresion_geometrica.jpg",	"progresiones_aritmeticas.jpg",	"prohibir.jpg",	"prologo.jpg",	"promesa.jpg",	"promesa_de_obediencia.jpg",	"prometido_v.jpg",	"pronombre.jpg",	"pronombre_posesivo.jpg",	"pronto.jpg",	"propiedad.jpg",	"propiedad_reflexiva.jpg",	"propiedad_transitiva.jpg",	"proporcion_geometrica.jpg",	"proporciones.jpg",	"prosopografia.jpg",	"prospero.jpg",	"proton.jpg",	"proximo.jpg",	"prudente.jpg",	"pueblo.jpg",	"pueblo_nuevo.jpg",	"pueblo_rico.jpg",	"puede.jpg",	"puente_festivo.jpg",	"puerto_berrio.jpg",	"puerto_colombia.jpg",	"puerto_lopez.jpg",	"puerto_rico.jpg",	"pulga.jpg",	"pulgada.jpg",	"pulido.jpg",	"pulir.jpg",	"pulmones.jpg",	"pulpo.jpg",	"puma.jpg",	"punto.jpg",	"punto_aparte.jpg",	"punto_de_apoyo.jpg",	"punto_de_fuerza.jpg",	"punto_de_resistencia.jpg",	"puntos_cardinales.jpg",	"puntual.jpg",	"pupila.jpg",	"purificacion.jpg",	"purificador.jpg",	"purisima.jpg"];
  const q = ["que.jpg",	"que_es_eso.jpg",	"que_le_pasa.jpg",	"que_paso.jpg",	"quedar.jpg",	"quemadura.jpg",	"querer.jpg",	"queso.jpg",	"queso_crema.jpg",	"queso_rallado.jpg",	"quien.jpg",	"quimbaya.jpg",	"quincena.jpg",	"quindio.jpg",	"quintal_geometrica.jpg",	"quinto.jpg",	"quiste.jpg"];
  const r = ["rabia.jpg",	"racionalizada.jpg",	"radiacion.jpg",	"radicacion.jpg",	"radical.jpg",	"radio.jpg",	"radiografia.jpg",	"radiolarios.jpg",	"raiz.jpg",	"rango.jpg",	"rango_de_una_relacion.jpg",	"rapido.jpg",	"raro.jpg",	"raton.jpg",	"rayo.jpg",	"rayos_x.jpg",	"razon.jpg",	"real_audiencia.jpg",	"recepcion.jpg",	"recordar.jpg",	"rectangulo.jpg",	"recto.jpg",	"rector.jpg",	"recuperar_la_salud.jpg",	"recuperar_materias.jpg",	"recuperar_objetos.jpg",	"recursos_naturales.jpg",	"red_de_telecomunicaciones.jpg",	"red_vial.jpg",	"redondeo.jpg",	"reflexion.jpg",	"reforestacion.jpg",	"refran.jpg",	"refuerzo.jpg",	"regan-ar.jpg",	"regimen.jpg",	"regiones_geograficas.jpg",	"regla.jpg",	"regla_de_tres.jpg",	"regla_de_tres_compuesta.jpg",	"regla_de_tres_simple.jpg",	"regocijar.jpg",	"reinado.jpg",	"reine.jpg",	"reir.jpg",	"relacion_de_equivalencia.jpg",	"relacion_definida.jpg",	"relacion_funcional.jpg",	"relacion_inyectiva.jpg",	"relacion_reflexiva.jpg",	"relacion_sobreyactiva.jpg",	"relaciones.jpg",	"relajacion.jpg",	"relevacion_y_fe.jpg",	"religion.jpg",	"religiosa.jpg",	"relog.jpg",	"renovables.jpg",	"renuncia.jpg",	"repasar.jpg",	"repetir.jpg",	"reposo.jpg",	"represa.jpg",	"representante.jpg",	"reproduccion.jpg",	"reproductora.jpg",	"reptan.jpg",	"reptiles.jpg",	"republica.jpg",	"republica_dominicana.jpg",	"residir.jpg",	"residuo.jpg",	"resorte.jpg",	"respetar.jpg",	"respiracion_pulmonar.jpg",	"respiracion_traqueal.jpg",	"respirar.jpg",	"responsabilidad.jpg",	"responsable.jpg",	"respuesta.jpg",	"resta.jpg",	"restaurante.jpg",	"restrepo.jpg",	"resureccion.jpg",	"retardo_mental.jpg",	"reticulo_endoplasmatico.jpg",	"retina.jpg",	"retiro.jpg",	"reto.jpg",	"retraso.jpg",	"reunion.jpg",	"reunir.jpg",	"revolucion.jpg",	"rey.jpg",	"rh.jpg",	"ricaurte.jpg",	"rico.jpg",	"riesgo.jpg",	"rinoceronte.jpg",	"rin-ones.jpg",	"rioblanco.jpg",	"riohacha.jpg",	"riosucio.jpg",	"riquisimo.jpg",	"ritos_finales.jpg",	"ritos_iniciales.jpg",	"robar.jpg",	"robusto.jpg",	"rocas_igneas.jpg",	"rojo.jpg",	"romanos.jpg",	"rombo.jpg",	"romper.jpg",	"roncar.jpg",	"ropa.jpg",	"rosa.jpg",	"rosado.jpg",	"rosario.jpg",	"rotacion.jpg",	"ruana.jpg"];
  const s = ["sabado.jpg",	"sabana.jpg",	"sabana_grande.jpg",	"saber.jpg",	"sabiduria.jpg",	"sabroso.jpg",	"sacerdote.jpg",	"saco.jpg",	"sacramento.jpg",	"sacramento_del_bautismo.jpg",	"sacrificar.jpg",	"sacrificio.jpg",	"sadismo.jpg",	"sagrada_escritura.jpg",	"sahagun.jpg",	"sal.jpg",	"sala.jpg",	"sala_de_cirugia.jpg",	"sala_de_espera.jpg",	"sala_de_parto.jpg",	"sala_de_rayos_x.jpg",	"sala_de_urgencias.jpg",	"salado.jpg",	"salamina.jpg",	"salazar.jpg",	"salchicha.jpg",	"salchichon.jpg",	"salento.jpg",	"salida.jpg",	"salir.jpg",	"salmo.jpg",	"salon.jpg",	"salsa_de_tomate.jpg",	"saltan.jpg",	"saltar.jpg",	"salud.jpg",	"saludo.jpg",	"salvador.jpg",	"salvador_del_mundo.jpg",	"salvaje.jpg",	"salvar.jpg",	"samaniego.jpg",	"samsung.jpg",	"samuel.jpg",	"san_alberto.jpg",	"san_bernardo.jpg",	"san_buenaventura.jpg",	"san_gil.jpg",	"san_juan.jpg",	"san_juan_del_cesar.jpg",	"san_juan_nepomuceno.jpg",	"san_lorenzo.jpg",	"san_lucas.jpg",	"san_luis.jpg",	"san_marcos.jpg",	"san_martin.jpg",	"san_mateo.jpg",	"sanacion.jpg",	"sandona.jpg",	"sangre.jpg",	"sano.jpg",	"santa_marta.jpg",	"santa_misa.jpg",	"santa_rosa_de_osos.jpg",	"santiago.jpg",	"santificador.jpg",	"santo_sacrificio.jpg",	"sapo.jpg",	"satisfaccion_de_obra.jpg",	"satisfecho.jpg",	"savia_bruta.jpg",	"savia_elaborada.jpg",	"secante.jpg",	"secretaria.jpg",	"secreto.jpg",	"secretora.jpg",	"sed.jpg",	"sedimentacion.jpg",	"seguir.jpg",	"segunda_de_corintios.jpg",	"segundo.jpg",	"seguro.jpg",	"seis_meses.jpg",	"semana.jpg",	"semana_santa.jpg",	"semestral.jpg",	"seminario.jpg",	"sena.jpg",	"seno.jpg",	"senos.jpg",	"sentarse.jpg",	"sentido.jpg",	"sentidos.jpg",	"sentir.jpg",	"separado.jpg",	"septiembre.jpg",	"ser.jpg",	"seres.jpg",	"seres_autotrofos.jpg",	"seres_heterotrofos.jpg",	"serio.jpg",	"servidumbre.jpg",	"seudonimo.jpg",	"sexologo.jpg",	"si.jpg",	"sibate.jpg",	"sicolinguista.jpg",	"sida.jpg",	"siempre.jpg",	"siglo.jpg",	"significante.jpg",	"signo.jpg",	"sigue_derecho_v.jpg",	"silaba.jpg",	"silencio.jpg",	"silogismo.jpg",	"simpatico.jpg",	"simple.jpg",	"simplificacion.jpg",	"sin_palabras.jpg",	"sinagoga.jpg",	"sinceridad.jpg",	"sindrome_de_down.jpg",	"sinonimos.jpg",	"sintaxis.jpg",	"sintesis.jpg",	"sinverguenza.jpg",	"siquiatra.jpg",	"sistema.jpg",	"sistema_binario.jpg",	"sistema_decimal.jpg",	"sistema_endocrino.jpg",	"sistema_hormonal.jpg",	"sistema_muscular.jpg",	"sistema_nervioso.jpg",	"sistema_respiratorio.jpg",	"sistema_somatico.jpg",	"sistole.jpg",	"sobresabana.jpg",	"sobrino.jpg",	"sobrino_v.jpg",	"social.jpg",	"sociales.jpg",	"socio.jpg",	"sociolinguista.jpg",	"sofa.jpg",	"sogamoso.jpg",	"sol.jpg",	"soledad.jpg",	"solidificacion.jpg",	"solo.jpg",	"solos_los_dos.jpg",	"soltero.jpg",	"solucion.jpg",	"sombra.jpg",	"sombrero.jpg",	"sonar.jpg",	"son-ar.jpg",	"sonson.jpg",	"sopa.jpg",	"soplaviento.jpg",	"soplo.jpg",	"sordo.jpg",	"sordociego.jpg",	"sorpresa.jpg",	"soy.jpg",	"suave.jpg",	"subconjunto.jpg",	"subida_v.jpg",	"subir.jpg",	"submultiplos_de_litro.jpg",	"submultiplos_del_gramo.jpg",	"submultiplos_del_metro.jpg",	"sucio.jpg",	"sudadera.jpg",	"sudor.jpg",	"suegro.jpg",	"suegro_v.jpg",	"suen-o.jpg",	"sufijo.jpg",	"suicidio.jpg",	"suma.jpg",	"sumados.jpg",	"superficie.jpg",	"supermercado.jpg",	"supia.jpg",	"suposicion.jpg",	"suspender.jpg",	"sustancia.jpg",	"sustancia_compuesta.jpg",	"sustantivo.jpg",	"sustantivo_comun.jpg",	"sustantivo_propio.jpg",	"sustraendo.jpg",	"suyo.jpg"];
  const t = ["tabla_de_datos.jpg",	"tablero.jpg",	"tacan-o.jpg",	"tacones.jpg",	"tacto_vaginal.jpg",	"taironas.jpg",	"tal_vez.jpg",	"talco.jpg",	"tallo.jpg",	"tamal.jpg",	"tamalameque.jpg",	"tambien.jpg",	"tampoco.jpg",	"tangente.jpg",	"tangua.jpg",	"tarde.jpg",	"tardes.jpg",	"tarea.jpg",	"taxi_v.jpg",	"te.jpg",	"te_amo.jpg",	"te_bendiga.jpg",	"te_invito.jpg",	"te_pregunto.jpg",	"tecnico.jpg",	"tecnologia.jpg",	"tejido.jpg",	"tejido_colenquimatoso.jpg",	"tejido_conductor.jpg",	"tejido_conjuntivo_elastico.jpg",	"tejido_epitelial.jpg",	"tejido_meristematico.jpg",	"tejidos_oseos.jpg",	"tejidos_parenquimaticos.jpg",	"tela.jpg",	"telefono.jpg",	"telefono_para_sordos.jpg",	"telegrafo.jpg",	"telescopio.jpg",	"television.jpg",	"televisor.jpg",	"telofase.jpg",	"temblor.jpg",	"temblor_de_tierra.jpg",	"tempera.jpg",	"temperatura.jpg",	"templanza.jpg",	"temprano.jpg",	"tener.jpg",	"tenis.jpg",	"tenjo.jpg",	"tension.jpg",	"tentacion.jpg",	"teorema.jpg",	"teorema_de_pitagoras.jpg",	"terapeuta_ocupacional.jpg",	"terapia.jpg",	"tercero.jpg",	"terco.jpg",	"terminal.jpg",	"terminar.jpg",	"termometro.jpg",	"terremoto.jpg",	"terrestre.jpg",	"tesalonicenses.jpg",	"tesorero.jpg",	"tesoro.jpg",	"testiculos.jpg",	"testigo.jpg",	"testimonio_de_dios.jpg",	"texto_escondido.jpg",	"tibu.jpg",	"tiburon.jpg",	"tiempos_verbales.jpg",	"tienda.jpg",	"tierra_esteril.jpg",	"tigre.jpg",	"tijera.jpg",	"timbre.jpg",	"timo.jpg",	"timoteo.jpg",	"tio.jpg",	"tio_v.jpg",	"tito.jpg",	"tiza.jpg",	"toalla.jpg",	"toalla_higienica.jpg",	"toca.jpg",	"tocador.jpg",	"tocaima.jpg",	"tocar.jpg",	"tocar_la_puerta.jpg",	"todo_el_dia.jpg",	"todopoderoso.jpg",	"todos.jpg",	"todos_los_dias.jpg",	"toledo.jpg",	"tolerancia.jpg",	"tolima.jpg",	"tomar.jpg",	"tomar_el_pulso.jpg",	"tomas.jpg",	"tomate.jpg",	"tomate_de_arbol.jpg",	"tonelada_metrica.jpg",	"torneo.jpg",	"toro.jpg",	"torta.jpg",	"tortuga.jpg",	"tos.jpg",	"trabajador_social.jpg",	"trabajar.jpg",	"traductor.jpg",	"traer.jpg",	"tragedia.jpg",	"tranquilo.jpg",	"transmilenio.jpg",	"transparente.jpg",	"transpiracion.jpg",	"transportador.jpg",	"trapecio.jpg",	"traslacion.jpg",	"traslucidos.jpg",	"trasnochar.jpg",	"trasplante.jpg",	"trauma.jpg",	"trepan.jpg",	"tres_meses.jpg",	"triangulo.jpg",	"triangulo_escaleno.jpg",	"triangulo_isosceles.jpg",	"trimestral.jpg",	"tripode.jpg",	"triptongo.jpg",	"trisilaba.jpg",	"triste.jpg",	"trombosis.jpg",	"trompa_de_eustaquio.jpg",	"trompa_de_falopio.jpg",	"tronco_cerebral.jpg",	"troposfera.jpg",	"tu.jpg",	"tu_mismo.jpg",	"tumaco.jpg",	"tunja.jpg",	"tuquerres.jpg",	"turbaco.jpg",	"turbana.jpg",	"turnar.jpg",	"turno.jpg",	"tutor.jpg",	"tuyo.jpg",	"twitter.jpg"];
  const u = ["ubate.jpg",	"ultimo.jpg",	"un.jpg",	"un_dia.jpg",	"un_mes.jpg",	"un_solo.jpg",	"un-a.jpg",	"ungir.jpg",	"unicelular.jpg",	"unidad.jpg",	"unidos.jpg",	"uniforme.jpg",	"union_con_dios.jpg",	"union_libre.jpg",	"universidad.jpg",	"urgente.jpg",	"uribe.jpg",	"urologo.jpg",	"urrao.jpg",	"uruguay.jpg",	"usb.jpg",	"usted.jpg",	"ustedes.jpg",	"ustedes_dos.jpg",	"utero.jpg",	"utica.jpg",	"uva.jpg"];
  const v = ["vaca.jpg",	"vacaciones.jpg",	"vacuna.jpg",	"vagina.jpg",	"vaiven.jpg",	"valioso.jpg",	"valle.jpg",	"valle_del_cauca.jpg",	"valor_personal.jpg",	"valores.jpg",	"vamos.jpg",	"vanidad.jpg",	"vara.jpg",	"vaso.jpg",	"vecino_v.jpg",	"veedor.jpg",	"vela.jpg",	"velatorio.jpg",	"velludo.jpg",	"venadillo.jpg",	"venado.jpg",	"venas_capilares.jpg",	"vendedor.jpg",	"vender.jpg",	"venecia.jpg",	"veneno.jpg",	"venir.jpg",	"ventana.jpg",	"ventures.jpg",	"ver.jpg",	"verbo.jpg",	"verdad.jpg",	"verde.jpg",	"verdura.jpg",	"versalles.jpg",	"verso.jpg",	"vertebrados.jpg",	"vesicula_biliar.jpg",	"vestido.jpg",	"vestido_blanco.jpg",	"vestido_de_ban-o.jpg",	"vestir.jpg",	"vestirse.jpg",	"viajar_por_avion.jpg",	"vicepresidente.jpg",	"vicio.jpg",	"victoria.jpg",	"vida.jpg",	"viejo.jpg",	"viernes.jpg",	"villamaria.jpg",	"villavicencio.jpg",	"villeta.jpg",	"vino.jpg",	"violacion.jpg",	"viota.jpg",	"virgen.jpg",	"virus.jpg",	"visa.jpg",	"visitar.jpg",	"vista_hermosa.jpg",	"visual.jpg",	"viviparos.jpg",	"vocabulario.jpg",	"vocal.jpg",	"voltimetro.jpg",	"volumen.jpg",	"vuelan.jpg",	"vulva.jpg"];
  const w = ["web.jpg","whatsapp.jpg","wifi.jpg"];
  const x = ["xilema.jpg"];
  const y = ["ya.jpg", "yacuanquer.jpg", "yarda.jpg", "yerno.jpg", "yo.jpg", "yogour.jpg", "yuca.jpg"];
  const z = ["zanahoria.jpg", "zancudo.jpg", "zipaquira.jpg"];

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("es-CO");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    llamarRuta(normalizarFrase(results[0]));//guardo las rutas usando la frase normalizada (sin tildes ni mayusculas)
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    setResults(result.value);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  
  //funcion para obetener la info del diccionario
  const llamarRuta = (frase) =>{
    rutas.splice(0, rutas.length);//borra las rutas anteriores
    if (frase!=""){//verifica que no sea una cadena vacia
      let fraseSeparada= frase.split(" ");//se obtiene cada palabra de la frase
      guardarRuta(fraseSeparada);//Aquí se manda el arreglo para definir las rutas
      //let raiz = "./assets/lengua/"+frase[0]+"/"+frase+".jpg";
    }else{
      rutas.push(frase);
    }
    cambiarImagen(rutas);
  }

  //Esta funcion almacena las rutas para poder desplegar cada imagen en el array de rutas
  const guardarRuta = (fraseSeparada) =>{
    for (let index = 0; index < fraseSeparada.length; index++) {
      if (verificarPalabra(fraseSeparada[index]+".jpg")==true && fraseSeparada[index].length>1){//verfica que si exista la palabra y que no sea una sola letra
        rutas.push(fraseSeparada[index]+".jpg");//Se agrega una ruta por palabra
      }else{          
          deletrear(fraseSeparada[index]);//Si no existe o es una sola letra, procede a buscar las rutas de cada letra (deletrar)
        }
      }
  }

  //la siguiente funcion busca en los arrays del diccionario para comprobar si la palabra existe o no
  const verificarPalabra = (palabra) =>{
    let existe = false;
    switch (palabra[0]){
        case "a":
          existe= a.includes(palabra);
          break;
        case "b":
          existe= b.includes(palabra);
          break;
        case "c":
          existe= c.includes(palabra);
          break;
        case "d":
          existe= d.includes(palabra);
          break;
        case "e":
          existe= e.includes(palabra);
          break;
        case "f":
          existe= f.includes(palabra);
          break;
        case "g":
          existe= g.includes(palabra);
          break;
        case "h":
          existe= h.includes(palabra);
          break;
        case "i":
          existe= i.includes(palabra);
          break;
        case "j":
          existe= j.includes(palabra);
          break;
        case "k":
          existe= k.includes(palabra);
          break;
        case "l":
          existe= l.includes(palabra);
          break;
        case "m":
          existe= m.includes(palabra);
          break;
        case "n":
          existe= n.includes(palabra);
          break;
        case "o":
          existe= o.includes(palabra);
          break;
        case "p":
          existe= p.includes(palabra);
          break;
        case "q":
          existe= q.includes(palabra);
          break;
        case "r":
          existe= r.includes(palabra);
          break;
        case "s":
          existe= s.includes(palabra);
          break;
        case "t":
          existe= t.includes(palabra);
          break;
        case "u":
          existe= u.includes(palabra);
          break;
        case "v":
          existe= v.includes(palabra);
          break;
        case "w":
          existe= w.includes(palabra);
          break;
        case "x":
          existe= x.includes(palabra);
          break;
        case "y":
          existe= y.includes(palabra);
          break;
        case "z":
          existe= z.includes(palabra);
          break;
      } 
    

    if(existe==false){//verifica si se trata de un numero
      existe=numeros.includes(palabra);
    }

    if (existe==false){
      return false;
    }else{
      return true;
    }
  }

  //La siguiente funcion tiene como proposito guardar en el arreglo rutas cada letra individual:
  const deletrear = (palabraDesconocida) =>{
    for (let index = 0; index < palabraDesconocida.length; index++) {
      rutas.push(palabraDesconocida[index]+".jpg");
      
    }
  }

//funcion para quitar tildes y establecer todo en minusculas
 const normalizarFrase = (frase) =>{
  let fraseNormalizada = frase.normalize('NFD').replace(/[\u0300-\u036f]/g, "");//quitar tildes
  return fraseNormalizada.toLowerCase(); //retornar en minusculas
 }

 //La siguiente funcion tiene como objetivo utilizar una frase y mostrar cada palabra o letra
 const cambiarImagen = (frase) =>{
  setDesabilitarBoton(true);
  let contador = 0;
  setFuente("cargando.gif");
  let temporizador = setInterval(function(){
    setFuente(frase[contador]);
      if(contador==frase.length){
        setFuente("conector_espera.jpg");
        setDesabilitarBoton(false);
        clearInterval(temporizador);
      }
    contador++;
    },1750);
 }



  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image}/>
      <View>
        <Text style={styles.subtitle}>¡Bienvenido al traductor de voz a Lengua de Señas Colombiana!</Text>
      </View>
        <Text style= {styles.salida}>{results[0]}</Text>
        {//results.map((result, index) => <Text style= {styles.subtitle} key={index}>{result}</Text>)}
        }

      <View style= {styles.lineaHorizontal}>
        {
        //<Button title= 'Mostrar contenido de la ruta' onPress={mostrarContenido}/>
        //<Image  style= {styles.avatar} source={require("./assets/hi.jpg")}/> <Image  style= {styles.avatar} source={{uri: "https://www.hetah.net/_assets/modules/traductor/img/h/hola.jpg"}}/>
        }
        <Text style= {styles.salida}>{fuente}</Text>
        <Image  style= {styles.avatar} source={Images.fuentes[fuente]}/>

      </View>
      
      <StatusBar style="auto" />
      {/*<TextInput 
        style= {styles.entrada}
        placeholder= "Introduzca texto"
      />*/}  
      
      {!started ? <Button disabled ={desabilitarBoton} title='Presione para traducir' color= "green" onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Presione para dejar de hablar' color= "red" onPress={stopSpeechToText} /> : undefined}
  
      

    </View>
    
  );
}

//Aqui creo estilos similar al css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'f1f1f1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
      paddingTop:100,
      height: 110,
      width: 250,
      resizeMode: 'contain',//sirve para dejar la imagen completa dentro de los parametros
      
      },

  salida:{
    fontSize:20,
    padding: 7,
    fontWeight: 'bold',
    color: 'green',
  },
  subtitle:{
    fontSize:20,
    padding: 7,
    fontWeight: 'bold',
    color: 'gray',
  },
  entrada:{
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  avatar:{
    maxWidth: '75%', 
    height: 250,
    
  },
  lineaHorizontal:{
    borderWidth: 2,
    borderColor: "rgba(0,255,0,0.15)",
    //borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 30,
    borderRadius: 5,
  }
});
// uso este comando para correr el demo de la aplicación eas build -p android --profile preview

/*
Posible manera de animar imagen en expo

export default function App() {
  const [viewState, setViewState] = React.useState(true);
  const scale = React.useRef(new Animated.Value(1)).current;
  const [init, setInit] = React.useState(true);
  React.useEffect(() => {
    if (init) {
      setInit(false);
    } else {
      if (viewState) {
        Animated.timing(scale, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(scale, {
          toValue: 0.5,
          duration: 700,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [viewState]);

  const scaleOut = () => {
    setViewState(!viewState);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Image
          style={styles.image}
          source={require('./assets/snack-icon.png')}
        />
      </Animated.View>
      <Button title="animate" onPress={scaleOut} />
    </View>
  );
}
*/ 



