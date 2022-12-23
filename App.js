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
  let [fuente, setFuente] = useState("conector_espera.gif");//tengo esta por ahora porque me pide un valor estatico
  let [desabilitarBoton, setDesabilitarBoton] = useState(false); //esta variable de estado permite desabilitar el boton mientras se ejecutan las señas

  //A continuacion se crean arreglos con las palabras existentes en lengua de señas para encontrar las rutas
  const a = ["abajo.gif","abandonar.gif","abanico.gif","abarcar.gif","abofetear.gif","abonar.gif","abono.gif","aborto.gif","abraham.gif","abreviar.gif","abrigo.gif","abril.gif","abrir_cortina.gif","absorber.gif","abstracto.gif","abuelo.gif","abuelo_v.gif","aburrido.gif","abuso.gif","abuso_sexual.gif","acabar.gif","acariciar.gif","accion_de_gracias.gif","aceite.gif","acelerar.gif","acento.gif","aceptar.gif","acera.gif","acercar.gif","acercarse.gif","acido.gif","acido_nucleico.gif","aclaracion.gif","acne.gif","acolitos.gif","acomodar.gif","acompan-ar.gif","acosar.gif","acoso_sexual.gif","acostarse.gif","acta.gif","actitud.gif","actual.gif","acuario.gif","acuatico.gif","acunar.gif","acurrucar.gif","adan.gif","adaptacion.gif","adelantar.gif","adherir.gif","adhesion.gif","adhesivo.gif","adiestrar.gif","adios.gif","adiposa.gif","adjetivo.gif","adjetivo_calificativo.gif","adjetivo_superlativo.gif","adjuntar.gif","administracion_de_empresas.gif","admirar.gif","admitir.gif","adobar.gif","adopcion.gif","adoptar.gif","adorable.gif","adoracion.gif","adorar.gif","adormilar.gif","adulto.gif","adverbio.gif","advertir.gif","aereos.gif","afan.gif","afiche.gif","afiliado.gif","afrontar.gif","agarrar.gif","agentes.gif","agosto.gif","agotado.gif","agotar.gif","agregar.gif","agua.gif","agua_chica.gif","agua_de_dios.gif","aguacate.gif","aguacero.gif","aguadas.gif","agustin_codazzi.gif","ahi_esta.gif","ahora.gif","aji.gif","ajo.gif","ajustar.gif","al_contrario.gif","al_lado.gif","al_lado_de_v.gif","ala.gif","alabanza.gif","alba.gif","albania.gif","alcala.gif","alcalde.gif","alcaldia.gif","alcanzar.gif","alcanzar_a_alguien.gif","alcanzar_algo.gif","alcanzar_el_puntaje.gif","alcoba.gif","alcoholismo.gif","alerta.gif","aletas.gif","alfabeto.gif","algebra.gif","algodon.gif","algunos.gif","alimentador.gif","alimento_espiritual.gif","alisar.gif","aliviar.gif","alla.gif","alma.gif","almacen.gif","almeja.gif","almidon.gif","almohada.gif","almojabana.gif","almuerzo.gif","alojar.gif","altar.gif","alterado.gif","alternativa.gif","alto.gif","aluminio.gif","alumno.gif","alvarado.gif","alveolos.gif","alza.gif","amable.gif","amalfi.gif","amanecer.gif","amante.gif","amargo.gif","amarillo.gif","amasar.gif","ambicioso.gif","ambientador.gif","ambon.gif","ameba.gif","amenaza.gif","america.gif","amigdala.gif","amigo.gif","amigo_v.gif","amonestar.gif","amor.gif","amorosa.gif","amos.gif","amperimetro.gif","amplificacion.gif","ampollas.gif","amputar.gif","anafase.gif","anapoima.gif","anaranjado.gif","anatomia.gif","ancho.gif","anciano.gif","androi.gif","andropausia.gif","anelidos.gif","anestesiologo.gif","anfibio.gif","angiospermas.gif","angostura.gif","angulo.gif","angulo_adyacente.gif","angulo_agudo.gif","angulo_complementario.gif","angulo_consecutivo.gif","angulo_convexo.gif","angulo_de_giro.gif","angulo_llano.gif","angulo_obtuso.gif","angulo_recto.gif","angulos_opuestos_por_el_vertice.gif","angulos_suplementarios.gif","anidacion.gif","animal.gif","animales.gif","animo.gif","an-o.gif","antena.gif","antepenultima_silaba.gif","antes.gif","antes_de.gif","antes_de_ayer.gif","antifaz.gif","antioquia.gif","antologia.gif","antonimo.gif","antropologo.gif","anual.gif","anunciacion.gif","aparato.gif","aparato_de_golgi.gif","apartado.gif","apartamento.gif","apartamento_v.gif","apenas.gif","aplaudir_oyentes.gif","aplaudir_sordos.gif","apocalipsis.gif","apoyar.gif","aprender.gif","apretado.gif","aprovechado.gif","aprovechar.gif","apulo.gif","aqui.gif","aracnidos.gif","aran-a.gif","aratoca.gif","arbitro.gif","arbol.gif","arcilla.gif","area.gif","area_lateral.gif","arepa.gif","argumentacion.gif","armenia.gif","arn.gif","aroma.gif","aromatica.gif","arrastrar.gif","arreglar.gif","arrendar.gif","arrepentimiento.gif","arriba.gif","arriesgar.gif","arroba.gif","arroz.gif","arruga.gif","arrugada.gif","arrugado.gif","articulacion_biologia.gif","articulacion_castellano.gif","articulo.gif","artropodos.gif","arveja.gif","arzobispo.gif","asaltar.gif","asamblea.gif","ascencion_de_jesus.gif","ascender.gif","asexual.gif","asfixia.gif","asignar.gif","asistir.gif","asma.gif","asociacion.gif","asombrar.gif","aspiracion.gif","aspiradora.gif","asquelmintos.gif","astrologo.gif","astronauta.gif","asumir_a_dios.gif","asunto.gif","asustarse.gif","atencion.gif","atmosfera.gif","atomo.gif","atraccion.gif","atrapar.gif","atrasado.gif","atrevido.gif","audicion.gif","auditiva.gif","auditor.gif","aula.gif","aurora.gif","automatico.gif","autonomo.gif","autopista.gif","autopista_v.gif","autor.gif","autoridad_de_dios.gif","autorizar.gif","autoservicio.gif","auxiliar.gif","avanzado.gif","avanzar.gif","avenida_v.gif","aventura.gif","aventura_sexual.gif","aves.gif","avion.gif","avisar.gif","aviso.gif","axioma.gif","ayer.gif","ayer_BIG.gif","ayuda.gif","ayudar.gif","azteca.gif","azucar.gif","azul.gif"];
  const alfabeto = ["a.gif",	"b.gif",	"c.gif",	"d.gif",	"e.gif",	"f.gif",	"g.gif",	"h.gif",	"i.gif",	"j.gif",	"k.gif",	"l.gif",	"m.gif",	"n.gif",	"n-.gif",	"o.gif",	"p.gif",	"q.gif",	"r.gif",	"s.gif",	"t.gif",	"u.gif",	"v.gif",	"w.gif",	"x.gif",	"y.gif",	"z.gif"];
  const b = ["babosa.gif",	"bafle.gif",	"bailar.gif",	"bailarina.gif",	"bajar.gif",	"bajar_cortina.gif",	"bajo.gif",	"balanceo.gif",	"balanza.gif",	"balboa.gif",	"ballena.gif",	"ballet.gif",	"baloncesto.gif",	"banano.gif",	"ban-ar.gif",	"banco.gif",	"bandera.gif",	"banquete.gif",	"banquitas.gif",	"barato.gif",	"barbero.gif",	"barbosa.gif",	"barrabas.gif",	"barrancabermeja.gif",	"barranquilla.gif",	"barrer.gif",	"base.gif",	"basura.gif",	"bautizado.gif",	"bautizar.gif",	"bautizo.gif",	"bazo.gif",	"bebe.gif",	"becerril.gif",	"becerro.gif",	"belalcazar.gif",	"belen.gif",	"belen_de_los_andaquies.gif",	"belen_de_umbria.gif",	"belen_narin-o.gif",	"belice.gif",	"bendicion.gif",	"benegnidad.gif",	"betulia.gif",	"biblia.gif",	"bibliografia.gif",	"biblioteca.gif",	"bibliotecologo.gif",	"bien.gif",	"bienvenido.gif",	"bigote.gif",	"bilinguismo.gif",	"bilirrubina.gif",	"bilis.gif",	"billete.gif",	"billete_de_loteria.gif",	"billetera.gif",	"billones.gif",	"bimestral.gif",	"binomio.gif",	"bioetica.gif",	"biologia.gif",	"biopsia.gif",	"biosfera.gif",	"biparticion.gif",	"bipedos.gif",	"bisilaba.gif",	"bisturi.gif",	"bizco.gif",	"blanco.gif",	"blanqueador.gif",	"blasfemia.gif",	"blusa.gif",	"bobada.gif",	"boca.gif",	"bocadillo.gif",	"bodega.gif",	"bofetada.gif",	"bogota.gif",	"bojaca.gif",	"boleta.gif",	"bolivar.gif",	"bolivar_ns.gif",	"bolivar_vc.gif",	"bolo_alimenticio.gif",	"bolsa.gif",	"bolso.gif",	"bomba.gif",	"bomba_de_aire.gif",	"bombardear.gif",	"bondad.gif",	"bonita.gif",	"borrador.gif",	"bosconia.gif",	"botas.gif",	"botella.gif",	"botiquin.gif",	"boton_accesesorio.gif",	"boton_maquina.gif",	"branquias.gif",	"brassier.gif",	"bravo.gif",	"brazo.gif",	"brillante.gif",	"bromear.gif",	"bronquiolos.gif",	"bronquios.gif",	"brujo.gif",	"brujula.gif",	"bucaramanga.gif",	"bucear.gif",	"buen_pastor.gif",	"buena_persona.gif",	"buena_vista.gif",	"buena_vista_q.gif",	"buenas.gif",	"bueno.gif",	"buenos.gif",	"bulbo.gif",	"bulbo_olfatorio.gif",	"bulto.gif",	"bun-uelo.gif",	"burgos.gif",	"burro.gif",	"buscar.gif",	"buseta.gif", "buzo.gif"];
  const c = ["caballero.gif",	"caballo.gif",	"cabello.gif",	"cabeza.gif",	"cabra.gif",	"cabrera.gif",	"cachucha.gif",	"cada_uno.gif",	"cadena.gif",	"caer.gif",	"cafe.gif",	"caicedonia.gif",	"caja.gif",	"caja_toracica.gif",	"cajamarca.gif",	"cajon.gif",	"cal.gif",	"calamar.gif",	"calambre.gif",	"calarca.gif",	"calcio.gif",	"calcular.gif",	"calculo_mental.gif",	"caldas.gif",	"caldereta.gif",	"caldo.gif",	"cali.gif",	"caliente.gif",	"califa.gif",	"calificacion.gif",	"calificar.gif",	"caliz.gif",	"calle.gif",	"calorica.gif",	"calvo.gif",	"calzones.gif",	"cama_matrimonial.gif",	"cama_sencilla.gif",	"camara.gif",	"camara_profesional.gif",	"camaron.gif",	"camarones.gif",	"cambiar.gif",	"camello.gif",	"camilla.gif",	"caminan.gif",	"caminar.gif",	"camisa.gif",	"camiseta.gif",	"campana.gif",	"campeon.gif",	"campeonato.gif",	"campo_de_la_cruz.gif",	"cana.gif",	"canada.gif",	"canasta.gif",	"cancer.gif",	"canciller.gif",	"candado.gif",	"candelabro.gif",	"candelaria.gif",	"candelero.gif",	"candidato.gif",	"caneca.gif",	"cangrejo.gif",	"canguro.gif",	"canino.gif",	"canoso.gif",	"cansado.gif",	"cantar.gif",	"cantidad.gif",	"capas_de_la_tierra.gif",	"capilar.gif",	"capital.gif",	"capitanejo.gif",	"capitulo.gif",	"cara.gif",	"caracol.gif",	"caracter.gif",	"carcasi.gif",	"cardiologo.gif",	"carga.gif",	"cargo.gif",	"caribe.gif",	"caridad.gif",	"carne.gif",	"carnicero.gif",	"caro.gif",	"carpeta.gif",	"carrera.gif",	"carreras.gif",	"carro.gif",	"carta.gif",	"cartagena.gif",	"cartagena_de_indias.gif",	"cartelera.gif",	"cartilaginoso.gif",	"cartuchera.gif",	"casa.gif",	"casa_de_campo.gif",	"casa_de_tres_pisos.gif",	"casa_v.gif",	"casado.gif",	"cascara.gif",	"casi.gif",	"cassette.gif",	"castilla_la_nueva.gif",	"casulla.gif",	"catecumeno.gif",	"catetos.gif",	"catolico.gif",	"caucho.gif",	"causa.gif",	"causar_placer.gif",	"cebolla.gif",	"cebolla_larga.gif",	"ceja.gif",	"celador.gif",	"celebrar.gif",	"celenteros.gif",	"celoma.gif",	"celoso.gif",	"celula.gif",	"celula_eucariotica.gif",	"celula_muscular.gif",	"celula_nerviosa.gif",	"celula_piramidal.gif",	"celula_procariota.gif",	"celular.gif",	"cenicero.gif",	"centiarea.gif",	"centigrados.gif",	"centigramo.gif",	"centilitro.gif",	"centimetro.gif",	"centimetro_cubico.gif",	"centralismo.gif",	"centro.gif",	"centroamerica.gif",	"cepillo.gif",	"cepillo_de_dientes.gif",	"cepillo_de_ropa.gif",	"cerca.gif",	"cerca_de_aqui_v.gif",	"cerca_v.gif",	"cerco.gif",	"cerdo.gif",	"cerebro.gif",	"cerrito.gif",	"cerveza.gif",	"cesarea.gif",	"chachagui.gif",	"champin-ones.gif",	"champu.gif",	"chapeton.gif",	"chaqueta.gif",	"charala.gif",	"charity_day.gif",	"charta.gif",	"Chef.gif",	"chima.gif",	"chimichagua.gif",	"chinacota.gif",	"chinchina.gif",	"chinu.gif",	"chispa.gif",	"chistoso.gif",	"chivo.gif",	"choachi.gif",	"choco.gif",	"chocolate.gif",	"choconta.gif",	"cianobacterias.gif",	"ciclo.gif",	"ciego.gif",	"cienaga.gif",	"cientifico.gif",	"cimitarra.gif",	"cinco_meses.gif",	"cine.gif",	"cinematografo.gif",	"cinetica.gif",	"cinta_pegante.gif",	"circasia.gif",	"circuito.gif",	"circuito_de_serie.gif",	"circuito_paralelo.gif",	"circulatorio.gif",	"circunferencia.gif",	"circunferencia_concentrica.gif",	"circunferencia_excentrica.gif",	"cirugia.gif",	"cirujano.gif",	"cisneros.gif",	"cita_bibliografica.gif",	"cita_textual.gif",	"citoplasma.gif",	"civil.gif",	"civismo.gif",	"clan.gif",	"claro.gif",	"clase.gif",	"clase_de_conjuntos.gif",	"clases_sociales.gif",	"clima_de_sabana.gif",	"clima_polar.gif",	"clima_subtropical.gif",	"clima_tropical.gif",	"clip.gif",	"clip_mariposa.gif",	"clitoris.gif",	"clorofila.gif",	"club.gif",	"coagulacion.gif",	"cobija.gif",	"cocina.gif",	"coco.gif",	"cocodrilo.gif",	"cocorna.gif",	"codigo.gif",	"coello.gif",	"coger.gif",	"colaboracion.gif",	"coleccionar.gif",	"colectivo.gif",	"colega_v.gif",	"colegio.gif",	"coloca_entre.gif",	"colocar_entre.gif",	"coloidal.gif",	"colombia.gif",	"colon.gif",	"colonia.gif",	"colonizador.gif",	"colorear.gif",	"colores.gif",	"colorete.gif",	"colosenses.gif",	"columna.gif",	"columna_vertebral.gif",	"coma.gif",	"combinacion.gif",	"comedia.gif",	"comedor.gif",	"comensalismo.gif",	"comenzar.gif",	"comer.gif",	"comida.gif",	"comision.gif",	"comision_de_comite.gif",	"como.gif",	"como_esta.gif",	"como_quiera.gif",	"compan-ero.gif",	"compan-ero_de_infancia.gif",	"comparar.gif",	"compas.gif",	"complemento.gif",	"completo.gif",	"comportamiento.gif",	"comprar.gif",	"comprensibilidad.gif",	"comprension.gif",	"compromiso.gif",	"compuesto.gif",	"computador.gif",	"computadores.gif",	"comulgar.gif",	"comunero.gif",	"comunicacion.gif",	"comunicador_social.gif",	"comunidad.gif",	"comunidad_religiosa.gif",	"comunion.gif",	"con1.gif",	"concepcion.gif",	"conceptual.gif",	"conciencia.gif",	"concilio.gif",	"concordato.gif",	"concreto.gif",	"concupiscencia.gif",	"concurso.gif",	"condecorar.gif",	"conducta.gif",	"conducto_biliar.gif",	"conejo.gif",	"conferencia.gif",	"confesion.gif",	"confianza.gif",	"confirmacion.gif",	"confirmar.gif",	"conflicto.gif",	"confrontar.gif",	"confuso.gif",	"congelar.gif",	"congestion_de_vehiculos.gif",	"conjuncion.gif",	"conjunto.gif",	"conjunto_lleno.gif",	"conjunto_por_compresion.gif",	"conjunto_por_extension.gif",	"conjunto_unitario.gif",	"conjunto_universal.gif",	"conjunto_vacio.gif",	"cono.gif",	"conocer.gif",	"conocido_v.gif",	"consecutivo.gif",	"conservacion.gif",	"conservar_la_fe.gif",	"consonante.gif",	"constante_proporcional.gif",	"constantinopla.gif",	"constumbre.gif",	"consuelo.gif",	"consumidor.gif",	"contado.gif",	"contar.gif",	"contemplar_a_dios.gif",	"contemporaneo.gif",	"contenido.gif",	"contento.gif",	"contexto.gif",	"contiene.gif",	"continuar.gif",	"contralor.gif",	"contrarreforma.gif",	"copacabana.gif",	"copon.gif",	"coqueta.gif",	"corazon.gif",	"corazones.gif",	"corbata.gif",	"corchete.gif",	"cordero_de_dios.gif",	"cordoba.gif",	"corintios.gif",	"coromoro.gif",	"corpus_christi.gif",	"corpusculo_de_meisser.gif",	"corpusculo_de_pacini.gif",	"correa.gif",	"correcto.gif",	"correr.gif",	"correspondencia.gif",	"corriente.gif",	"corroer.gif",	"corrupcion.gif",	"corte_constitucional.gif",	"cosecha.gif",	"cosencante.gif",	"coseno.gif",	"costa_rica.gif",	"costumbre.gif",	"cotangente.gif",	"crecer.gif",	"credito.gif",	"credo.gif",	"crema_de_dientes.gif",	"crema_de_manos.gif",	"cremallera.gif",	"cristo.gif",	"critica.gif",	"criticar.gif",	"cromoplastos.gif",	"cromosomas.gif",	"crucifijo.gif",	"cruz.gif",	"cruz_roja.gif",	"cruza_a_la_izquierda_v.gif",	"cruza_a_la_v.gif",	"cuaderno.gif",	"cuadrado_de_un_numero.gif",	"cuadricula.gif",	"cuadro.gif",	"cuadrupedos.gif",	"cuajada.gif",	"cual.gif",	"cual_1.gif",	"cual_2.gif",	"cual_3.gif",	"cual_BIG.gif",	"cual_de_los_dos.gif",	"cualidad.gif",	"cualquiera.gif",	"cuando.gif",	"cuantificadores.gif",	"cuanto.gif",	"cuaresma.gif",	"cuarta.gif",	"cuarto_horizontal.gif",	"cuatro_meses.gif",	"cuba.gif",	"cubarral.gif",	"cubrelecho.gif",	"cucaracha.gif",	"cuchilla.gif",	"cucuta.gif",	"cuello.gif",	"cuero.gif",	"cuerpo.gif",	"cuerpo_del_libro.gif",	"cuidado.gif",	"culebra.gif",	"culpa.gif",	"cultural.gif",	"cun-ado.gif",	"cun-ado_v.gif",	"curioso.gif",	"curita.gif",	"curso.gif",	"curuba.gif",	"curva.gif",	"custodia.gif",	"cutaneo.gif"];
  const d = ["dan-ado.gif",	"danza.gif",	"dar.gif",	"darse_cuenta.gif",	"de.gif",	"de_acuerdo.gif",	"de_dia.gif",	"de_noche.gif",	"de_pronto.gif",	"deber.gif",	"deberes.gif",	"debil.gif",	"decada.gif",	"decagono.gif",	"decagramo.gif",	"decalitro.gif",	"decametro.gif",	"decametro_cubico.gif",	"decena.gif",	"decente.gif",	"decepcionado.gif",	"decigramo.gif",	"decilitro.gif",	"decimetro.gif",	"decimetro_cubico.gif",	"decir.gif",	"dedicacion.gif",	"dedos.gif",	"defensoria_del_pueblo.gif",	"dejar.gif",	"dejar_algo.gif",	"delgado.gif",	"delicadeza.gif",	"demorar.gif",	"denominador.gif",	"densidad.gif",	"dentadura.gif",	"dentario.gif",	"deportar.gif",	"deporte.gif",	"depredacion.gif",	"deprimido.gif",	"derechos.gif",	"derivada.gif",	"dermis.gif",	"derrotar.gif",	"desacuerdo.gif",	"desafio.gif",	"desarrollar.gif",	"desayuno.gif",	"descansa.gif",	"descansar.gif",	"descomposicion.gif",	"descripcion.gif",	"descubrir.gif",	"desea.gif",	"desgastar.gif",	"deshidratacion.gif",	"desicion.gif",	"desigual.gif",	"desinfectar.gif",	"deslizar.gif",	"desmayarse.gif",	"desnudar.gif",	"desobediente.gif",	"desodorante.gif",	"desordenar.gif",	"despacio.gif",	"despertar.gif",	"despues.gif",	"desvestirse.gif",	"desvincularse.gif",	"determinante.gif",	"Deuteronomio.gif",	"dia.gif",	"diacono.gif",	"diagonal.gif",	"dialecto.gif",	"dialogar.gif",	"diametro.gif",	"diarrea.gif",	"dias.gif",	"diastole.gif",	"dibujar.gif",	"dibulla.gif",	"diciembre.gif",	"dicipulo.gif",	"dictado.gif",	"didactico.gif",	"dientes.gif",	"dieresis.gif",	"diferente.gif",	"dificil.gif",	"difusion.gif",	"digestivo.gif",	"digito.gif",	"dignidad.gif",	"dilatacion.gif",	"dimensiones.gif",	"dimutivo.gif",	"dios.gif",	"dios_esta_oculto.gif",	"director.gif",	"director_ejecutivo.gif",	"discapacidad.gif",	"discoteca.gif",	"discrecion.gif",	"discurso.gif",	"dise_no.gif",	"disen-ador.gif",	"disen-ador_grafico.gif",	"disgregacion.gif",	"dispersar.gif",	"distanciarse.gif",	"disyunto.gif",	"dividendo.gif",	"divisible.gif",	"division.gif",	"divisor.gif",	"divisores_de_un_numero.gif",	"documento.gif",	"dolor.gif",	"dolorosos.gif",	"domesticos.gif",	"domingo.gif",	"dominio_de_una_relacion.gif",	"donde.gif",	"donde_queda_v.gif",	"donde_vives.gif",	"dones.gif",	"dormir.gif",	"dos_meses.gif",	"dos_puntos.gif",	"doxologia.gif",	"ductilidad.gif",	"duele.gif",	"dulce.gif",	"duodeno.gif",	"durazno.gif",	"duro.gif"];
  const e = ["ebullicion.gif",	"eclipse.gif",	"ecopetrol.gif",	"ecosistema.gif",	"ecuaciones.gif",	"edad_contemporanea.gif",	"edad_media.gif",	"edad_moderna.gif",	"edificio.gif",	"editorial.gif",	"educacion_virtual.gif",	"EEUU.gif",	"efesios.gif",	"eficaz.gif",	"eficiente.gif",	"egoista.gif",	"el.gif",	"el_cairo.gif",	"el_calvario.gif",	"el_carmen_de_bolivar.gif",	"el_dovio.gif",	"el_general.gif",	"el_guacamayo.gif",	"el_oido.gif",	"el_olfato.gif",	"el_pen-ol.gif",	"el_rosario.gif",	"el_salvador_pais.gif",	"el_tablon.gif",	"el_tacto.gif",	"elasticidad.gif",	"elastico.gif",	"electrica.gif",	"electricista.gif",	"electron.gif",	"elefante.gif",	"elegante.gif",	"elegir.gif",	"elemento.gif",	"ella.gif",	"ellas.gif",	"ellos.gif",	"ellos_dos.gif",	"embalses.gif",	"embarazo.gif",	"embetunar.gif",	"emblema.gif",	"embobar.gif",	"embolador.gif",	"embrion.gif",	"embudo.gif",	"emigracion.gif",	"emocionado.gif",	"empalme.gif",	"empanada.gif",	"emparedado.gif",	"empate.gif",	"empezar.gif",	"empleada_domestica.gif",	"empleo.gif",	"emprendetic.gif",	"enamorar.gif",	"encantar.gif",	"encarnacion.gif",	"encefalo.gif",	"encendedor.gif",	"encestador.gif",	"encestar.gif",	"enciclopedismo.gif",	"encino.gif",	"encontrar.gif",	"encontrar_1.gif",	"encontrar_2.gif",	"encuentro_con_dios.gif",	"enemigo.gif",	"energia.gif",	"energia_calorica.gif",	"enero.gif",	"enfermedad.gif",	"enfermo.gif",	"enflaquecer.gif",	"enfrentar.gif",	"enfrente.gif",	"enganchar.gif",	"enlace.gif",	"ensalada.gif",	"ensen-ame.gif",	"ensen-ar.gif",	"ensordecido.gif",	"entender.gif",	"entendimiento.gif",	"entrar.gif",	"entre_rios.gif",	"entrecruzamiento.gif",	"envigado.gif",	"epidermis.gif",	"epiglotis.gif",	"epitelial.gif",	"epitelio.gif",	"equilibrio.gif",	"equinodermos.gif",	"equipaje.gif",	"equipo.gif",	"equivalente.gif",	"equivocar.gif",	"era.gif",	"era_antropozoica.gif",	"era_cuaternaria.gif",	"era_geologica.gif",	"eres.gif",	"erizado.gif",	"esbelta.gif",	"escamas.gif",	"escoger.gif",	"escogida.gif",	"escolastica.gif",	"esconder.gif",	"esconder_animales.gif",	"esconder_cosas.gif",	"esconder_personas.gif",	"escribir.gif",	"escritor.gif",	"escuadra.gif",	"escucha.gif",	"escuchar.gif",	"escuchar_a_dios.gif",	"esfero.gif",	"esofago.gif",	"espacios.gif",	"espagueti.gif",	"espalda.gif",	"espan-ol.gif",	"especial.gif",	"especialista.gif",	"especie.gif",	"espejo.gif",	"esperar.gif",	"espeso.gif",	"espina.gif",	"espinal.gif",	"espinilla.gif",	"espiracion.gif",	"espiritu.gif",	"espiritu_santo.gif",	"esponja.gif",	"esposa.gif",	"esposas.gif",	"esposo.gif",	"esposo_BIG.gif",	"esposo_v.gif",	"esposos.gif",	"esta.gif",	"esta1.gif",	"esta2.gif",	"estadistica.gif",	"estado.gif",	"estallar.gif",	"estamos.gif",	"estampado.gif",	"estampilla.gif",	"estancar.gif",	"estatica.gif",	"estatua.gif",	"estatuto.gif",	"esteril.gif",	"esternicleidomastoideo.gif",	"esther.gif",	"estola.gif",	"estomago.gif",	"estopa.gif",	"estrategia.gif",	"estren-imiento.gif",	"estuche.gif",	"estudiante.gif",	"estudiar.gif",	"estudio.gif",	"estudio_cropologico.gif",	"estudio_fisico.gif",	"estufa.gif",	"eterno.gif",	"etica.gif",	"etopeya.gif",	"eucaristia.gif",	"eva.gif",	"evangelio.gif",	"evaporacion.gif",	"evidente.gif",	"evitar.gif",	"exacta.gif",	"exagerar.gif",	"examen.gif",	"examen_medico.gif",	"excremento.gif",	"excretor.gif",	"excretora.gif",	"exhibicionista.gif",	"exhibir.gif",	"exodo.gif",	"experto.gif",	"explicar.gif",	"exportar.gif",	"exposicion.gif",	"expresion.gif",	"expresiones_algebraicas.gif",	"expresivo.gif",	"expulsar.gif",	"extension.gif",	"extran-ar.gif",	"extranjerismo.gif",	"extremidades.gif",	"extremos_proporcionales.gif"];
  const f = ["facatativa.gif",	"facebook.gif",	"facil.gif",	"factor_rh.gif",	"factores.gif",	"factores_primos.gif",	"factorizacion.gif",	"falan.gif",	"falda.gif",	"falla.gif",	"fallar.gif",	"falso.gif",	"falta.gif",	"familia.gif",	"famoso.gif",	"fanatico.gif",	"fanegada.gif",	"fantasia.gif",	"faringe.gif",	"fariseos.gif",	"faro.gif",	"fascinar.gif",	"fauna.gif",	"fe.gif",	"febrero.gif",	"fecha.gif",	"fecundacion.gif",	"federacion.gif",	"felicitaciones.gif",	"felicitar.gif",	"felipe_evangelista.gif",	"feliz.gif",	"feliz_cumplea_nos.gif",	"feo.gif",	"feria.gif",	"fertil.gif",	"festivo.gif",	"ficha_bibliografica.gif",	"fidelidad.gif",	"fiebre.gif",	"figura.gif",	"figura_geometrica.gif",	"filtracion.gif",	"fin_de_mes.gif",	"finca.gif",	"fines_de_la_eucaristia.gif",	"fino.gif",	"firma.gif",	"firme.gif",	"fiscal.gif",	"flaco.gif",	"flandes.gif",	"flecha.gif",	"flexion.gif",	"flojo.gif",	"florencia.gif",	"florero.gif",	"flota.gif",	"fluctuacion.gif",	"fonema.gif",	"forma.gif",	"formal.gif",	"formar.gif",	"formas_de_locomocion.gif",	"foro.gif",	"fortaleza.gif",	"forzar.gif",	"foto_documento.gif",	"fotocopiadora.gif",	"fotosintesis.gif",	"fracasado.gif",	"fraccion_del_pan.gif",	"fractura.gif",	"fragil.gif",	"fraile.gif",	"frasco.gif",	"frase.gif",	"frecuencia.gif",	"freno.gif",	"frente.gif",	"fresa.gif",	"fresno.gif",	"frio.gif",	"frontera.gif",	"frontino.gif",	"frustado.gif",	"fruta.gif",	"fuera_del_comun.gif",	"fuerte.gif",	"funciones.gif",	"funda.gif",	"fundacion.gif",	"fundacion_hetah.gif",	"fundador.gif",	"funes.gif",	"funza.gif",	"furioso.gif",	"fusible.gif",	"fusiforme.gif",	"fusion.gif",	"futbol.gif",	"futuro.gif"];
  const g = ["gabinete.gif",	"gacheta.gif",	"gafas.gif",	"galan.gif",	"galapa.gif",	"galatas.gif",	"galleta.gif",	"gallina.gif",	"gallo.gif",	"galon.gif",	"gamarra.gif",	"gambita.gif",	"ganancias.gif",	"gancho.gif",	"gancho_de_ropa.gif",	"gancho_para_ropero.gif",	"garaje.gif",	"garrote.gif",	"gas.gif",	"gaseosa.gif",	"gasolina.gif",	"gato.gif",	"gelatina.gif",	"gemelos_v.gif",	"gen.gif",	"generoso.gif",	"genesis.gif",	"genotipo.gif",	"genova.gif",	"gente.gif",	"gentilicio.gif",	"geologia.gif",	"geometria.gif",	"gerundio.gif",	"gimnacio.gif",	"gimnasia.gif",	"ginecologo.gif",	"girardot.gif",	"girardota.gif",	"glande.gif",	"glandulas.gif",	"glandulas_paratiroides.gif",	"glandulas_salivales.gif",	"glandulas_sudoriparas.gif",	"glandulas_suprarenales.gif",	"glandulas_tiroides.gif",	"globo_ocular.gif",	"globulos.gif",	"gloriosos.gif",	"google.gif",	"gordo.gif",	"gorila.gif",	"grabar_un_video.gif",	"gracia.gif",	"gracias.gif",	"grado_fahrenheit.gif",	"grados.gif",	"grafema.gif",	"grafica.gif",	"grafica_de_barras.gif",	"grafica_de_lineas.gif",	"grafica_de_puntos.gif",	"gramatica.gif",	"gramo.gif",	"granada.gif",	"granadilla.gif",	"grande.gif",	"granivoros.gif",	"grano.gif",	"grasa.gif",	"grasoso.gif",	"gratis.gif",	"grave.gif",	"gravedad.gif",	"greca.gif",	"griego.gif",	"grieta.gif",	"grillo.gif",	"gripa.gif",	"gris.gif",	"grito.gif",	"grosero.gif",	"guaca.gif",	"guacari.gif",	"guadalupe.gif",	"guamal.gif",	"guantes.gif",	"guapo.gif",	"guapota.gif",	"guarne.gif",	"guatica.gif",	"guavata.gif",	"guayaba.gif",	"gusano.gif",	"gusanos.gif",	"gustar.gif"];
  const h = ["habichuela.gif",	"habitad.gif",	"habla_mal_de.gif",	"hablar.gif",	"hace_poco.gif",	"hace_poquito.gif",	"hace_tiempo.gif",	"hacer.gif",	"hacer_el_amor.gif",	"hacienda.gif",	"hamaca.gif",	"hambre.gif",	"hay.gif",	"hebreo.gif",	"hectarea.gif",	"hectogramo.gif",	"hectolitro.gif",	"hectometro.gif",	"hectometro_cubico.gif",	"heptagono.gif",	"herbivoros.gif",	"herejia.gif",	"hermano.gif",	"hermano_v.gif",	"herodes.gif",	"herpes.gif",	"herramientas.gif",	"hetah.gif",	"hexagono.gif",	"hiato.gif",	"hiena.gif",	"higado.gif",	"higiene.gif",	"hijo.gif",	"hijo_v.gif",	"hilum.gif",	"himen.gif",	"himno_nacional.gif",	"hiperactivo.gif",	"hiperbole.gif",	"hipismo.gif",	"hipoacusico.gif",	"hipocausico.gif",	"hipotenusa.gif",	"hippie.gif",	"histerectomia.gif",	"historia.gif",	"historieta.gif",	"hogar.gif",	"hojas.gif",	"hola.gif",	"hombre.gif",	"hombro.gif",	"homenaje.gif",	"homosexual.gif",	"hondo.gif",	"honestidad.gif",	"honrado.gif",	"hora.gif",	"hospital.gif",	"hostia.gif",	"hotel.gif",	"hoy.gif",	"huella_dactilar.gif",	"huila.gif",	"humanidad.gif",	"humano.gif",	"humilde.gif",	"humus.gif",	"huso_acromatico.gif"];
  const i = ["ibague.gif",	"icap.gif",	"ICBF.gif",	"ICFES.gif",	"idea.gif",	"identidad.gif",	"idioma.gif",	"iglesia.gif",	"iglesia_domestica.gif",	"igual.gif",	"igualdad.gif",	"ilustracion.gif",	"imagen_de_dios.gif",	"imaginacion.gif",	"iman.gif",	"imitar.gif",	"impenetrabilidad.gif",	"implicacion.gif",	"imponer.gif",	"importacion.gif",	"importante.gif",	"imposible.gif",	"imposicion_de_manos.gif",	"imprevisto.gif",	"incapacitado.gif",	"Incas.gif",	"INCI.gif",	"incisivos.gif",	"inclusion.gif",	"incognita.gif",	"incoloro.gif",	"incorporar.gif",	"incubacion.gif",	"incubadora.gif",	"incumplir.gif",	"indicativo.gif",	"indice.gif",	"indocumentado.gif",	"inexacta.gif",	"infarto.gif",	"infinitivo.gif",	"inflamable.gif",	"informacion.gif",	"ingeniero.gif",	"Ingeniero_Civil.gif",	"inicio.gif",	"inmenso.gif",	"inmiscuir.gif",	"innovadora.gif",	"innovadores.gif",	"innovadores_de_america.gif",	"inoloro.gif",	"inquisicion.gif",	"insaboro.gif",	"inscripcion.gif",	"insecticida.gif",	"insectivoros.gif",	"insectos.gif",	"inseminacion.gif",	"insolacion.gif",	"INSOR.gif",	"inspiracion.gif",	"instinto.gif",	"instinto_sexual.gif",	"Instituto_de_Seguro_Sociales.gif",	"insulto.gif",	"inteligencia.gif",	"inteligente.gif",	"intencion.gif",	"Interaccion.gif",	"interdependencia.gif",	"interes.gif",	"interes_compuesto.gif",	"interes_simple.gif",	"interferir.gif",	"interferir_cosas.gif",	"Interferir_relaciones_personales.gif",	"intermediario_indirecto.gif",	"internado.gif",	"internar.gif",	"internet.gif",	"interno.gif",	"interponer.gif",	"interpretar.gif",	"interprete.gif",	"interrumpir.gif",	"interseccion.gif",	"intestino_delgado.gif",	"intestino_grueso.gif",	"introduccion.gif",	"inundacion.gif",	"inutil.gif",	"invadir.gif",	"inventar.gif",	"invento.gif",	"inversion.gif",	"inverso.gif",	"invertebrados.gif",	"investidura.gif",	"invidente.gif",	"invitame.gif",	"invitar.gif",	"involuntario.gif",	"inyeccion.gif",	"ipad.gif",	"iphone.gif",	"iris.gif",	"irradiar.gif",	"irrumpir.gif",	"isaias.gif",	"Islam.gif",	"isquion.gif",	"israel.gif"];
  const j = ["jabalina.gif", "jabon.gif", "jaguar.gif", "jamas.gif", "jamundi.gif", "jardin.gif", "jardinero.gif", "jaula.gif", "jefe.gif", "jefe_de_cocina.gif", "jefe_v.gif", "jerarquia_de_la_iglesia.gif", "jeringa.gif", "jerusalen.gif", "jesus_maria.gif", "jordan.gif", "jose_padre_de_jesus.gif", "josue.gif", "joven.gif", "joya_de_fantasia.gif", "joyero.gif", "juan_evangelista.gif", "juanete.gif", "jubilacion.gif", "judas_tadeo.gif", "judio.gif", "jueves.gif", "jugar.gif", "jugar_cometa.gif", "juicio_moral.gif", "juicioso.gif", "julio.gif", "junio.gif", "junta_directiva.gif", "justicia.gif", "justificar.gif"];
  const k = ["kilogramo.gif",	"kilolitro.gif",	"kilometro.gif",	"kilometro_cubico.gif"];
  const l = ["la_celia.gif",	"la_cruz.gif",	"la_jagua_del_pilar.gif",	"la_merced.gif",	"la_mesa.gif",	"la_palma.gif",	"la_papa.gif",	"la_paz.gif",	"la_pintada.gif",	"la_tebaida.gif",	"la_union.gif",	"la_union_vc.gif",	"la_vega.gif",	"la_virginia.gif",	"la_vista.gif",	"ladeado.gif",	"ladear.gif",	"ladrar.gif",	"ladrillo.gif",	"lagrima.gif",	"lagrimeo.gif",	"laico.gif",	"lana.gif",	"lapicero.gif",	"lapiz.gif",	"lapiz_labial.gif",	"laser.gif",	"latigo.gif",	"latin.gif",	"latinoamerica.gif",	"latitud.gif",	"lavadero.gif",	"leal.gif",	"lealtad.gif",	"lebrija.gif",	"leccion.gif",	"leccionario.gif",	"leche_condensada.gif",	"lechuga.gif",	"lector.gif",	"leer.gif",	"legua_maritima.gif",	"legua_terrestre.gif",	"lejanias.gif",	"lejos.gif",	"lejos_v.gif",	"lengua.gif",	"lengua_de_sen-as.gif",	"lenguaje.gif",	"lentes.gif",	"lentes_divergentes.gif",	"leopardo.gif",	"leproso.gif",	"lerida.gif",	"les_pregunto.gif",	"letra.gif",	"letra_mayuscula.gif",	"letra_minuscula.gif",	"levantarse.gif",	"lexema.gif",	"lexico.gif",	"libano.gif",	"liberacion.gif",	"libertad.gif",	"libra.gif",	"lider.gif",	"limon.gif",	"limosnero.gif",	"limpiar.gif",	"limpio.gif",	"lindisimo.gif",	"lindo.gif",	"linea_curva.gif",	"linfatico.gif",	"linguista.gif",	"lisosomas.gif",	"lista.gif",	"listo.gif",	"litro.gif",	"liturgia_de_la_palabra.gif",	"llamado.gif",	"llamame.gif",	"llamar.gif",	"llamar_a_larga_distancia.gif",	"llamar_por_telefono.gif",	"llamativo.gif",	"llano.gif",	"llanto.gif",	"llanura.gif",	"llave.gif",	"llegar.gif",	"llenar.gif",	"llevar.gif",	"llorar.gif",	"llover.gif",	"llovizna.gif",	"lluvia.gif",	"lo_digo_una_sola_vez.gif",	"lo_siento.gif",	"lobo.gif",	"localizar.gif",	"logaritmo.gif",	"logica.gif",	"longitud.gif",	"los_invito.gif",	"los_patios.gif",	"los_santos.gif",	"lotero.gif",	"luminosos.gif",	"luna_de_miel.gif",	"lunes.gif",	"luruaco.gif",	"lustrabotas.gif",	"lustrar.gif",	"lustro.gif",	"luto.gif",	"luz.gif"];
  const m = ["mac.gif",	"machismo.gif",	"macho.gif",	"madre.gif",	"madre_v.gif",	"madrid.gif",	"madrina.gif",	"madrugada.gif",	"madrugar.gif",	"maestro_de_musica.gif",	"magangue.gif",	"magdalena.gif",	"magia.gif",	"magisterio.gif",	"magnetismo.gif",	"magnitud_proporcional.gif",	"mahates.gif",	"Mahoma.gif",	"maicao.gif",	"mal.gif",	"mala_persona.gif",	"malaga.gif",	"malambo.gif",	"maleabilidad.gif",	"mama.gif",	"mamatoco.gif",	"mamiferos.gif",	"mamografia.gif",	"man-ana.gif",	"mandarina.gif",	"manejar.gif",	"manejar_carro.gif",	"mango.gif",	"manifestacion.gif",	"manipulacion_genetica.gif",	"manipular.gif",	"maniqui.gif",	"manizales.gif",	"mano.gif",	"manta.gif",	"mantel.gif",	"manzana.gif",	"manzanares.gif",	"maparipan.gif",	"maquillarse.gif",	"maquina_de_afeitar.gif",	"mar_negro.gif",	"mar_rojo.gif",	"maravilloso.gif",	"marcador.gif",	"mareo.gif",	"margarita.gif",	"maria.gif",	"maria_la_baja.gif",	"marioneta.gif",	"marquetalia.gif",	"marsella.gif",	"martes.gif",	"marulanda.gif",	"marzo.gif",	"masa.gif",	"masaje.gif",	"masturbacion_masculina.gif",	"matas.gif",	"matematicas.gif",	"materia.gif",	"matrimonio.gif",	"maximo_comun_divisor.gif",	"Mayas.gif",	"mayo.gif",	"mayonesa.gif",	"mayor.gif",	"mazamorra.gif",	"mazorca.gif",	"medalla.gif",	"medellin.gif",	"media.gif",	"media_proporcional.gif",	"mediatriz.gif",	"medicamento.gif",	"medicina_nuclear.gif",	"medico.gif",	"medida_cubica.gif",	"medidas_agrarias.gif",	"medidas_de_longitud.gif",	"medidas_de_peso.gif",	"medidas_de_superficie.gif",	"medidas_de_temperatura.gif",	"medidas_de_tiempo.gif",	"medios_de_una_proporcion.gif",	"medula_espinal.gif",	"mejor.gif",	"melgar.gif",	"membrana.gif",	"memoria.gif",	"menos.gif",	"menstruacion.gif",	"mensual.gif",	"mentir.gif",	"mentiroso.gif",	"menton.gif",	"mercado.gif",	"mercancia.gif",	"mes.gif",	"mesa_de_noche.gif",	"mesetas.gif",	"mesias.gif",	"mesoamerica.gif",	"meta.gif",	"metafase.gif",	"metamorfosis.gif",	"metido.gif",	"metodo.gif",	"metodo_cientifico.gif",	"metro_cuadrado.gif",	"metro_cubico.gif",	"mexico.gif",	"mezcla.gif",	"mi.gif",	"microfilamento.gif",	"miembros_de_la_iglesia.gif",	"miercoles.gif",	"migracion.gif",	"milagro.gif",	"miligramo.gif",	"milimetro_cubico.gif",	"milla.gif",	"mimar.gif",	"minimo_comun_multiplo.gif",	"ministerio.gif",	"ministerio_de.gif",	"ministerio_de_ cultura.gif",	"ministerio_de_comunicacion.gif",	"ministerio_de_desarrollo.gif",	"ministerio_de_educacion.gif",	"ministerio_de_energia.gif",	"ministerio_de_hacienda.gif",	"ministerio_de_justicia.gif",	"ministerio_de_relaciones_exteriores.gif",	"ministerio_de_salud.gif",	"ministerio_de_trabajo.gif",	"ministerio_de_transito_y_transporte.gif",	"ministro.gif",	"minuendo.gif",	"minuto.gif",	"mio.gif",	"miopia.gif",	"miqueas.gif",	"miriametro.gif",	"miriametro_cubico.gif",	"misericordia.gif",	"mistrato.gif",	"mitocondria.gif",	"mitosis.gif",	"moda.gif",	"moda_medida.gif",	"modelaje.gif",	"modelo.gif",	"mogotes.gif",	"moises.gif",	"mojar.gif",	"molares.gif",	"molecula.gif",	"molestar.gif",	"moluscos.gif",	"mompos.gif",	"Mongoles.gif",	"mono.gif",	"monomio.gif",	"monosilaba.gif",	"monoteismo.gif",	"monstruo.gif",	"monte_del_calvario.gif",	"montenegro.gif",	"mora.gif",	"moral.gif",	"morder.gif",	"moreno.gif",	"morfema.gif",	"morfologia.gif",	"morir.gif",	"morral.gif",	"mostrar.gif",	"motora.gif",	"mover.gif",	"mucho.gif",	"mucho_gusto.gif",	"muerte.gif",	"muerte_natural.gif",	"mujer.gif",	"multiplicacion.gif",	"multiplos_de_gramo.gif",	"multiplos_de_litro.gif",	"multiplos_de_metro.gif",	"multiplos_de_un_numero.gif",	"multiplos_de_volumen.gif",	"mun-eco.gif",	"municipio.gif",	"municipio_de_bello.gif",	"musculo_cardiaco.gif",	"musculo_deltoides.gif",	"musculo_estriado.gif",	"musculo_liso.gif",	"musculo_mayor_pectoral.gif",	"musculo_mentoniano.gif",	"musculo_orbicular_de_los_labios.gif",	"musculo_recto_superior.gif",	"musculo_sartorio.gif",	"musculo_trapecio.gif",	"musculos_extensores_comunes_de_los_dedos.gif",	"musica.gif",	"mutaciones.gif"];
  const n = ["nacer.gif",	"nacimiento.gif",	"nacionalismo.gif",	"nacionalista.gif",	"nada.gif",	"nadan.gif",	"nadar.gif",	"naipe.gif",	"naranja.gif",	"narigon.gif",	"nariguera.gif",	"narin-o.gif",	"nariz.gif",	"natacion.gif",	"natural.gif",	"naturaleza.gif",	"navidad.gif",	"nazareth.gif",	"nazismo.gif",	"necesitar.gif",	"nectar.gif",	"negro.gif",	"neira.gif",	"neolitico.gif",	"nervio.gif",	"nervioso.gif",	"neurona.gif",	"neurona_bipolar.gif",	"neurona_central.gif",	"neutro.gif",	"neutron.gif",	"nevera.gif",	"nicaragua.gif",	"nieta_v.gif",	"nieto.gif",	"nieto_v.gif",	"nin-o.gif",	"nivel.gif",	"no.gif",	"no_alcanza.gif",	"no_creo.gif",	"no_importa.gif",	"no_pertinencia.gif",	"no_poder.gif",	"no_renovables.gif",	"no_repito.gif",	"no_saber.gif",	"no_sirve.gif",	"noches.gif",	"nocion.gif",	"nombre.gif",	"nonagono.gif",	"nosotros.gif",	"nosotros_1.gif",	"nosotros_2.gif",	"nosotros_dos.gif",	"noticia.gif",	"noticiero.gif",	"novela.gif",	"noviembre.gif",	"novio.gif",	"novio_v.gif",	"nucleo.gif",	"nudo.gif",	"nuera.gif",	"nuestro.gif",	"nuevo.gif",	"nuevo_testamento.gif",	"nulidad_del_matrimonio.gif",	"numerador.gif",	"numero.gif",	"numero_atomico.gif",	"numero_decimal.gif",	"numeros.gif",	"numeros_complejos.gif",	"numeros_enteros.gif",	"numeros_fraccionarios.gif",	"numeros_irracionales.gif",	"numeros_naturales.gif",	"numeros_primos.gif",	"numeros_racionales.gif",	"numeros_reales.gif",	"numeros_romanos.gif",	"nunca.gif",	"nutrientes.gif"];
  const numeros= ["catorce.gif",	"cero.gif",	"cien.gif",	"ciento.gif",	"cinco.gif",	"cincomil.gif",	"cincuenta.gif",	"cuarenta.gif",	"cuatro.gif",	"cuatrocientos.gif",	"cuatromil.gif",	"diecinueve.gif",	"dieciocho.gif",	"dieciseis.gif",	"diecisiete.gif",	"diez.gif",	"doce.gif",	"dos.gif",	"doscientos.gif",	"dosmil.gif",	"framenumfinal.gif",	"mil.gif",	"miles.gif",	"millon.gif",	"millones.gif",	"novecientos.gif",	"noventa.gif",	"nueve.gif",	"ochenta.gif",	"ocho.gif",	"ochocientos.gif",	"once.gif",	"quince.gif",	"quinientos.gif",	"seis.gif",	"seiscientos.gif",	"sesenta.gif",	"setecientos.gif",	"setenta.gif",	"siete.gif",	"trece.gif",	"trecientos.gif",	"treinta.gif",	"tres.gif",	"tresmil.gif",	"uno.gif",	"veinte.gif"];
  const o = ["obedecer.gif",	"obediente_a_dios.gif",	"objetivo.gif",	"objeto_agente.gif",	"objeto_instrumento.gif",	"objeto_paciente.gif",	"obligacion.gif",	"observar.gif",	"obstreta.gif",	"obstruccion_nasal.gif",	"ocamote.gif",	"ocan-a.gif",	"oclusivo.gif",	"octagono.gif",	"octubre.gif",	"ocupado.gif",	"odio.gif",	"oferta.gif",	"oficina.gif",	"ofrecer.gif",	"ofrenda.gif",	"oftalmologo.gif",	"oiba.gif",	"oido.gif",	"oidores.gif",	"oir.gif",	"ojala.gif",	"ojeras.gif",	"ojos.gif",	"olimpiada.gif",	"olor.gif",	"olvidar.gif",	"omnivoros.gif",	"ondas_de_polarizacion.gif",	"operacionales.gif",	"operador.gif",	"opinar.gif",	"optimista.gif",	"oracion.gif",	"oracion_afirmativa.gif",	"oracion_desiderativa.gif",	"oracion_dubitativa.gif",	"oracion_enunciativa.gif",	"oracion_exclamativa.gif",	"oracion_interrogativa.gif",	"orbita.gif",	"orbita_ocular.gif",	"orden.gif",	"orden_sacerdotal.gif",	"ordenar.gif",	"oreja.gif",	"organos.gif",	"organos_genitales.gif",	"orgulloso.gif",	"origen.gif",	"ortodoncista.gif",	"ortografia.gif",	"oscilacion.gif",	"oscuro.gif",	"osea.gif",	"oseas.gif",	"oso.gif",	"ostra.gif",	"otorrinolaringologo.gif",	"otra_vez.gif",	"otro.gif",	"ovario.gif",	"oviparos.gif",	"ovispo.gif",	"ovulacion.gif",	"ovulos.gif",	"oxidacion.gif",	"oxigeno.gif",	"oyente.gif"];
  const p = ["paciencia.gif",	"padre.gif",	"padre_nuestro.gif",	"padre_v.gif",	"padres.gif",	"padres_v.gif",	"padrino.gif",	"pagar.gif",	"paila.gif",	"pailitas.gif",	"paipa.gif",	"paisaje.gif",	"pajaro.gif",	"palabra.gif",	"palabra_aguda.gif",	"palabra_compuesta.gif",	"palabra_dubitativa.gif",	"palabra_esdrujula.gif",	"palabra_grave.gif",	"palabra_homofona.gif",	"palabra_homografa.gif",	"palabra_homonima.gif",	"palabra_primitiva.gif",	"palabra_simple.gif",	"palabra_sobreesdrujula.gif",	"palanca.gif",	"paleolitico.gif",	"palestina.gif",	"palido.gif",	"palma_del_socorro.gif",	"palmar_de_varela.gif",	"palmira.gif",	"paludismo.gif",	"pan.gif",	"pana_v.gif",	"panadero.gif",	"pan-al.gif",	"panela.gif",	"pantalon.gif",	"pantaloncillo.gif",	"pantufla.gif",	"papa.gif",	"pa-pa.gif",	"papaya.gif",	"papel.gif",	"papel_higienico.gif",	"papilas.gif",	"para.gif",	"para_que.gif",	"para_que_aprenda.gif",	"paradero.gif",	"paramecio.gif",	"paramo.gif",	"parar_transporte.gif",	"parausia.gif",	"parcial_de_orina.gif",	"parecido.gif",	"parenquima.gif",	"parenquima_acuifero.gif",	"parenquima_clorofilico.gif",	"parenquimas_de_reserva.gif",	"parentesis.gif",	"paro_cardiado.gif",	"paronimas.gif",	"parpadeo.gif",	"parpados.gif",	"parque.gif",	"parrafo.gif",	"parrilla.gif",	"partes_del_libro.gif",	"participar.gif",	"participio.gif",	"partido_conservador.gif",	"partido_de.gif",	"partido_liberal.gif",	"parto_vaginal.gif",	"pasado.gif",	"pasado_man-ana.gif",	"pasaporte.gif",	"pascua.gif",	"pasta.gif",	"pastilla.gif",	"pasto.gif",	"patacon.gif",	"patagonia.gif",	"pataleta.gif",	"patena.gif",	"pato.gif",	"paz.gif",	"pc_dos.gif",	"pecado.gif",	"pedagogica.gif",	"pedazo.gif",	"pedro.gif",	"pegante.gif",	"pegante_de_barra.gif",	"pegante_liquido.gif",	"pegar_cosas.gif",	"peinilla.gif",	"pelear.gif",	"peligroso.gif",	"pelo.gif",	"pelota.gif",	"peluqueria.gif",	"pena_de_muerte.gif",	"penar.gif",	"pendulo.gif",	"pene.gif",	"penitencia.gif",	"pen-ol.gif",	"pensar.gif",	"pensar_cosas.gif",	"pensar_personas.gif",	"pensilvania.gif",	"pentagono.gif",	"penultima_silaba.gif",	"peor.gif",	"pequen-ito.gif",	"pequen-o.gif",	"pera.gif",	"perder.gif",	"perdida_de_conocimiento.gif",	"perdon.gif",	"pereza.gif",	"perezoso.gif",	"perfecto.gif",	"perforadora.gif",	"perfume.gif",	"perfume_de_mujer.gif",	"perimetro.gif",	"permiso.gif",	"perro.gif",	"perro_caliente.gif",	"persona.gif",	"persona_esteril.gif",	"persona_pulida.gif",	"personajes_de_la_biblia.gif",	"perspectiva.gif",	"pertenecer.gif",	"pertenencia.gif",	"peru.gif",	"pesebre.gif",	"pesimista.gif",	"peso.gif",	"pestan-a.gif",	"petan-as.gif",	"petroleo.gif",	"pez.gif",	"pi.gif",	"picar.gif",	"pie.gif",	"piedras.gif",	"piel_desnuda.gif",	"pierna.gif",	"pies.gif",	"pijao.gif",	"piloto.gif",	"pin-a.gif",	"pin-ata.gif",	"pincel.gif",	"pinchote.gif",	"pinguino.gif",	"pintar.gif",	"pintor_artista.gif",	"pintor_de_inmuebles.gif",	"pintura.gif",	"piojo.gif",	"piramide.gif",	"pirata.gif",	"pivijay.gif",	"piyama.gif",	"pizza.gif",	"plancha.gif",	"plano.gif",	"plano_cartesiano.gif",	"plantas_cormofitas.gif",	"plantas_espermatofitas.gif",	"plantas_gimnospermas.gif",	"plantas_monocotiledoneas.gif",	"plaquetas.gif",	"plasma.gif",	"plata.gif",	"platano.gif",	"plato_magdalena.gif",	"platon.gif",	"playa.gif",	"plomero.gif",	"pluma.gif",	"pluricelular.gif",	"pobre.gif",	"poco.gif",	"poco_a_poco.gif",	"poder.gif",	"poeta.gif",	"polea.gif",	"poligono.gif",	"polinomio.gif",	"polisilaba.gif",	"pollito.gif",	"pollo.gif",	"polonuevo.gif",	"poltrona.gif",	"ponedera.gif",	"ponque.gif",	"por_donde.gif",	"por_el_medio.gif",	"por_favor.gif",	"por_la_man-ana.gif",	"por_la_noche.gif",	"por_la_tarde.gif",	"por_que.gif",	"porcion.gif",	"portada.gif",	"portatil.gif",	"porteria.gif",	"postulado.gif",	"potencia_enesima.gif",	"potenciacion.gif",	"practicar.gif",	"prado.gif",	"preguntame.gif",	"preguntar.gif",	"premisa.gif",	"premolares.gif",	"preocupado.gif",	"presbicia.gif",	"presentar.gif",	"presente.gif",	"presidente.gif",	"presion_atmosferica.gif",	"prestar.gif",	"primer_piso.gif",	"primera_de_corintios.gif",	"primero.gif",	"primo.gif",	"primo_v.gif",	"principio.gif",	"principio_etico.gif",	"prisma.gif",	"probabilidad.gif",	"probar_alimentos.gif",	"problema.gif",	"producto_cartesiano.gif",	"productor.gif",	"profase.gif",	"profesional.gif",	"profesor.gif",	"profesores.gif",	"progresion_geometrica.gif",	"progresiones_aritmeticas.gif",	"prohibir.gif",	"prologo.gif",	"promesa.gif",	"promesa_de_obediencia.gif",	"prometido_v.gif",	"pronombre.gif",	"pronombre_posesivo.gif",	"pronto.gif",	"propiedad.gif",	"propiedad_reflexiva.gif",	"propiedad_transitiva.gif",	"proporcion_geometrica.gif",	"proporciones.gif",	"prosopografia.gif",	"prospero.gif",	"proton.gif",	"proximo.gif",	"prudente.gif",	"pueblo.gif",	"pueblo_nuevo.gif",	"pueblo_rico.gif",	"puede.gif",	"puente_festivo.gif",	"puerto_berrio.gif",	"puerto_colombia.gif",	"puerto_lopez.gif",	"puerto_rico.gif",	"pulga.gif",	"pulgada.gif",	"pulido.gif",	"pulir.gif",	"pulmones.gif",	"pulpo.gif",	"puma.gif",	"punto.gif",	"punto_aparte.gif",	"punto_de_apoyo.gif",	"punto_de_fuerza.gif",	"punto_de_resistencia.gif",	"puntos_cardinales.gif",	"puntual.gif",	"pupila.gif",	"purificacion.gif",	"purificador.gif",	"purisima.gif"];
  const q = ["que.gif",	"que_es_eso.gif",	"que_le_pasa.gif",	"que_paso.gif",	"quedar.gif",	"quemadura.gif",	"querer.gif",	"queso.gif",	"queso_crema.gif",	"queso_rallado.gif",	"quien.gif",	"quimbaya.gif",	"quincena.gif",	"quindio.gif",	"quintal_geometrica.gif",	"quinto.gif",	"quiste.gif"];
  const r = ["rabia.gif",	"racionalizada.gif",	"radiacion.gif",	"radicacion.gif",	"radical.gif",	"radio.gif",	"radiografia.gif",	"radiolarios.gif",	"raiz.gif",	"rango.gif",	"rango_de_una_relacion.gif",	"rapido.gif",	"raro.gif",	"raton.gif",	"rayo.gif",	"rayos_x.gif",	"razon.gif",	"real_audiencia.gif",	"recepcion.gif",	"recordar.gif",	"rectangulo.gif",	"recto.gif",	"rector.gif",	"recuperar_la_salud.gif",	"recuperar_materias.gif",	"recuperar_objetos.gif",	"recursos_naturales.gif",	"red_de_telecomunicaciones.gif",	"red_vial.gif",	"redondeo.gif",	"reflexion.gif",	"reforestacion.gif",	"refran.gif",	"refuerzo.gif",	"regan-ar.gif",	"regimen.gif",	"regiones_geograficas.gif",	"regla.gif",	"regla_de_tres.gif",	"regla_de_tres_compuesta.gif",	"regla_de_tres_simple.gif",	"regocijar.gif",	"reinado.gif",	"reine.gif",	"reir.gif",	"relacion_de_equivalencia.gif",	"relacion_definida.gif",	"relacion_funcional.gif",	"relacion_inyectiva.gif",	"relacion_reflexiva.gif",	"relacion_sobreyactiva.gif",	"relaciones.gif",	"relajacion.gif",	"relevacion_y_fe.gif",	"religion.gif",	"religiosa.gif",	"relog.gif",	"renovables.gif",	"renuncia.gif",	"repasar.gif",	"repetir.gif",	"reposo.gif",	"represa.gif",	"representante.gif",	"reproduccion.gif",	"reproductora.gif",	"reptan.gif",	"reptiles.gif",	"republica.gif",	"republica_dominicana.gif",	"residir.gif",	"residuo.gif",	"resorte.gif",	"respetar.gif",	"respiracion_pulmonar.gif",	"respiracion_traqueal.gif",	"respirar.gif",	"responsabilidad.gif",	"responsable.gif",	"respuesta.gif",	"resta.gif",	"restaurante.gif",	"restrepo.gif",	"resureccion.gif",	"retardo_mental.gif",	"reticulo_endoplasmatico.gif",	"retina.gif",	"retiro.gif",	"reto.gif",	"retraso.gif",	"reunion.gif",	"reunir.gif",	"revolucion.gif",	"rey.gif",	"rh.gif",	"ricaurte.gif",	"rico.gif",	"riesgo.gif",	"rinoceronte.gif",	"rin-ones.gif",	"rioblanco.gif",	"riohacha.gif",	"riosucio.gif",	"riquisimo.gif",	"ritos_finales.gif",	"ritos_iniciales.gif",	"robar.gif",	"robusto.gif",	"rocas_igneas.gif",	"rojo.gif",	"romanos.gif",	"rombo.gif",	"romper.gif",	"roncar.gif",	"ropa.gif",	"rosa.gif",	"rosado.gif",	"rosario.gif",	"rotacion.gif",	"ruana.gif"];
  const s = ["sabado.gif",	"sabana.gif",	"sabana_grande.gif",	"saber.gif",	"sabiduria.gif",	"sabroso.gif",	"sacerdote.gif",	"saco.gif",	"sacramento.gif",	"sacramento_del_bautismo.gif",	"sacrificar.gif",	"sacrificio.gif",	"sadismo.gif",	"sagrada_escritura.gif",	"sahagun.gif",	"sal.gif",	"sala.gif",	"sala_de_cirugia.gif",	"sala_de_espera.gif",	"sala_de_parto.gif",	"sala_de_rayos_x.gif",	"sala_de_urgencias.gif",	"salado.gif",	"salamina.gif",	"salazar.gif",	"salchicha.gif",	"salchichon.gif",	"salento.gif",	"salida.gif",	"salir.gif",	"salmo.gif",	"salon.gif",	"salsa_de_tomate.gif",	"saltan.gif",	"saltar.gif",	"salud.gif",	"saludo.gif",	"salvador.gif",	"salvador_del_mundo.gif",	"salvaje.gif",	"salvar.gif",	"samaniego.gif",	"samsung.gif",	"samuel.gif",	"san_alberto.gif",	"san_bernardo.gif",	"san_buenaventura.gif",	"san_gil.gif",	"san_juan.gif",	"san_juan_del_cesar.gif",	"san_juan_nepomuceno.gif",	"san_lorenzo.gif",	"san_lucas.gif",	"san_luis.gif",	"san_marcos.gif",	"san_martin.gif",	"san_mateo.gif",	"sanacion.gif",	"sandona.gif",	"sangre.gif",	"sano.gif",	"santa_marta.gif",	"santa_misa.gif",	"santa_rosa_de_osos.gif",	"santiago.gif",	"santificador.gif",	"santo_sacrificio.gif",	"sapo.gif",	"satisfaccion_de_obra.gif",	"satisfecho.gif",	"savia_bruta.gif",	"savia_elaborada.gif",	"secante.gif",	"secretaria.gif",	"secreto.gif",	"secretora.gif",	"sed.gif",	"sedimentacion.gif",	"seguir.gif",	"segunda_de_corintios.gif",	"segundo.gif",	"seguro.gif",	"seis_meses.gif",	"semana.gif",	"semana_santa.gif",	"semestral.gif",	"seminario.gif",	"sena.gif",	"seno.gif",	"senos.gif",	"sentarse.gif",	"sentido.gif",	"sentidos.gif",	"sentir.gif",	"separado.gif",	"septiembre.gif",	"ser.gif",	"seres.gif",	"seres_autotrofos.gif",	"seres_heterotrofos.gif",	"serio.gif",	"servidumbre.gif",	"seudonimo.gif",	"sexologo.gif",	"si.gif",	"sibate.gif",	"sicolinguista.gif",	"sida.gif",	"siempre.gif",	"siglo.gif",	"significante.gif",	"signo.gif",	"sigue_derecho_v.gif",	"silaba.gif",	"silencio.gif",	"silogismo.gif",	"simpatico.gif",	"simple.gif",	"simplificacion.gif",	"sin_palabras.gif",	"sinagoga.gif",	"sinceridad.gif",	"sindrome_de_down.gif",	"sinonimos.gif",	"sintaxis.gif",	"sintesis.gif",	"sinverguenza.gif",	"siquiatra.gif",	"sistema.gif",	"sistema_binario.gif",	"sistema_decimal.gif",	"sistema_endocrino.gif",	"sistema_hormonal.gif",	"sistema_muscular.gif",	"sistema_nervioso.gif",	"sistema_respiratorio.gif",	"sistema_somatico.gif",	"sistole.gif",	"sobresabana.gif",	"sobrino.gif",	"sobrino_v.gif",	"social.gif",	"sociales.gif",	"socio.gif",	"sociolinguista.gif",	"sofa.gif",	"sogamoso.gif",	"sol.gif",	"soledad.gif",	"solidificacion.gif",	"solo.gif",	"solos_los_dos.gif",	"soltero.gif",	"solucion.gif",	"sombra.gif",	"sombrero.gif",	"sonar.gif",	"son-ar.gif",	"sonson.gif",	"sopa.gif",	"soplaviento.gif",	"soplo.gif",	"sordo.gif",	"sordociego.gif",	"sorpresa.gif",	"soy.gif",	"suave.gif",	"subconjunto.gif",	"subida_v.gif",	"subir.gif",	"submultiplos_de_litro.gif",	"submultiplos_del_gramo.gif",	"submultiplos_del_metro.gif",	"sucio.gif",	"sudadera.gif",	"sudor.gif",	"suegro.gif",	"suegro_v.gif",	"suen-o.gif",	"sufijo.gif",	"suicidio.gif",	"suma.gif",	"sumados.gif",	"superficie.gif",	"supermercado.gif",	"supia.gif",	"suposicion.gif",	"suspender.gif",	"sustancia.gif",	"sustancia_compuesta.gif",	"sustantivo.gif",	"sustantivo_comun.gif",	"sustantivo_propio.gif",	"sustraendo.gif",	"suyo.gif"];
  const t = ["tabla_de_datos.gif",	"tablero.gif",	"tacan-o.gif",	"tacones.gif",	"tacto_vaginal.gif",	"taironas.gif",	"tal_vez.gif",	"talco.gif",	"tallo.gif",	"tamal.gif",	"tamalameque.gif",	"tambien.gif",	"tampoco.gif",	"tangente.gif",	"tangua.gif",	"tarde.gif",	"tardes.gif",	"tarea.gif",	"taxi_v.gif",	"te.gif",	"te_amo.gif",	"te_bendiga.gif",	"te_invito.gif",	"te_pregunto.gif",	"tecnico.gif",	"tecnologia.gif",	"tejido.gif",	"tejido_colenquimatoso.gif",	"tejido_conductor.gif",	"tejido_conjuntivo_elastico.gif",	"tejido_epitelial.gif",	"tejido_meristematico.gif",	"tejidos_oseos.gif",	"tejidos_parenquimaticos.gif",	"tela.gif",	"telefono.gif",	"telefono_para_sordos.gif",	"telegrafo.gif",	"telescopio.gif",	"television.gif",	"televisor.gif",	"telofase.gif",	"temblor.gif",	"temblor_de_tierra.gif",	"tempera.gif",	"temperatura.gif",	"templanza.gif",	"temprano.gif",	"tener.gif",	"tenis.gif",	"tenjo.gif",	"tension.gif",	"tentacion.gif",	"teorema.gif",	"teorema_de_pitagoras.gif",	"terapeuta_ocupacional.gif",	"terapia.gif",	"tercero.gif",	"terco.gif",	"terminal.gif",	"terminar.gif",	"termometro.gif",	"terremoto.gif",	"terrestre.gif",	"tesalonicenses.gif",	"tesorero.gif",	"tesoro.gif",	"testiculos.gif",	"testigo.gif",	"testimonio_de_dios.gif",	"texto_escondido.gif",	"tibu.gif",	"tiburon.gif",	"tiempos_verbales.gif",	"tienda.gif",	"tierra_esteril.gif",	"tigre.gif",	"tijera.gif",	"timbre.gif",	"timo.gif",	"timoteo.gif",	"tio.gif",	"tio_v.gif",	"tito.gif",	"tiza.gif",	"toalla.gif",	"toalla_higienica.gif",	"toca.gif",	"tocador.gif",	"tocaima.gif",	"tocar.gif",	"tocar_la_puerta.gif",	"todo_el_dia.gif",	"todopoderoso.gif",	"todos.gif",	"todos_los_dias.gif",	"toledo.gif",	"tolerancia.gif",	"tolima.gif",	"tomar.gif",	"tomar_el_pulso.gif",	"tomas.gif",	"tomate.gif",	"tomate_de_arbol.gif",	"tonelada_metrica.gif",	"torneo.gif",	"toro.gif",	"torta.gif",	"tortuga.gif",	"tos.gif",	"trabajador_social.gif",	"trabajar.gif",	"traductor.gif",	"traer.gif",	"tragedia.gif",	"tranquilo.gif",	"transmilenio.gif",	"transparente.gif",	"transpiracion.gif",	"transportador.gif",	"trapecio.gif",	"traslacion.gif",	"traslucidos.gif",	"trasnochar.gif",	"trasplante.gif",	"trauma.gif",	"trepan.gif",	"tres_meses.gif",	"triangulo.gif",	"triangulo_escaleno.gif",	"triangulo_isosceles.gif",	"trimestral.gif",	"tripode.gif",	"triptongo.gif",	"trisilaba.gif",	"triste.gif",	"trombosis.gif",	"trompa_de_eustaquio.gif",	"trompa_de_falopio.gif",	"tronco_cerebral.gif",	"troposfera.gif",	"tu.gif",	"tu_mismo.gif",	"tumaco.gif",	"tunja.gif",	"tuquerres.gif",	"turbaco.gif",	"turbana.gif",	"turnar.gif",	"turno.gif",	"tutor.gif",	"tuyo.gif",	"twitter.gif"];
  const u = ["ubate.gif",	"ultimo.gif",	"un.gif",	"un_dia.gif",	"un_mes.gif",	"un_solo.gif",	"un-a.gif",	"ungir.gif",	"unicelular.gif",	"unidad.gif",	"unidos.gif",	"uniforme.gif",	"union_con_dios.gif",	"union_libre.gif",	"universidad.gif",	"urgente.gif",	"uribe.gif",	"urologo.gif",	"urrao.gif",	"uruguay.gif",	"usb.gif",	"usted.gif",	"ustedes.gif",	"ustedes_dos.gif",	"utero.gif",	"utica.gif",	"uva.gif"];
  const v = ["vaca.gif",	"vacaciones.gif",	"vacuna.gif",	"vagina.gif",	"vaiven.gif",	"valioso.gif",	"valle.gif",	"valle_del_cauca.gif",	"valor_personal.gif",	"valores.gif",	"vamos.gif",	"vanidad.gif",	"vara.gif",	"vaso.gif",	"vecino_v.gif",	"veedor.gif",	"vela.gif",	"velatorio.gif",	"velludo.gif",	"venadillo.gif",	"venado.gif",	"venas_capilares.gif",	"vendedor.gif",	"vender.gif",	"venecia.gif",	"veneno.gif",	"venir.gif",	"ventana.gif",	"ventures.gif",	"ver.gif",	"verbo.gif",	"verdad.gif",	"verde.gif",	"verdura.gif",	"versalles.gif",	"verso.gif",	"vertebrados.gif",	"vesicula_biliar.gif",	"vestido.gif",	"vestido_blanco.gif",	"vestido_de_ban-o.gif",	"vestir.gif",	"vestirse.gif",	"viajar_por_avion.gif",	"vicepresidente.gif",	"vicio.gif",	"victoria.gif",	"vida.gif",	"viejo.gif",	"viernes.gif",	"villamaria.gif",	"villavicencio.gif",	"villeta.gif",	"vino.gif",	"violacion.gif",	"viota.gif",	"virgen.gif",	"virus.gif",	"visa.gif",	"visitar.gif",	"vista_hermosa.gif",	"visual.gif",	"viviparos.gif",	"vocabulario.gif",	"vocal.gif",	"voltimetro.gif",	"volumen.gif",	"vuelan.gif",	"vulva.gif"];
  const w = ["web.gif","whatsapp.gif","wifi.gif"];
  const x = ["xilema.gif"];
  const y = ["ya.gif", "yacuanquer.gif", "yarda.gif", "yerno.gif", "yo.gif", "yogour.gif", "yuca.gif"];
  const z = ["zanahoria.gif", "zancudo.gif", "zipaquira.gif"];

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
    await Voice.stop();
    setStarted(false);
    llamarRuta(normalizarFrase(results[0]));//guardo las rutas usando la frase normalizada (sin tildes ni mayusculas)
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
      //let raiz = "./assets/lengua/"+frase[0]+"/"+frase+".gif";
    }else{
      rutas.push(frase);
    }
    cambiarImagen(rutas);
  }

  //Esta funcion almacena las rutas para poder desplegar cada imagen en el array de rutas
  const guardarRuta = (fraseSeparada) =>{
    for (let index = 0; index < fraseSeparada.length; index++) {
      if (verificarPalabra(fraseSeparada[index]+".gif")==true && fraseSeparada[index].length>1){//verfica que si exista la palabra y que no sea una sola letra
        rutas.push(fraseSeparada[index]+".gif");//Se agrega una ruta por palabra
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
      rutas.push(palabraDesconocida[index]+".gif");
      
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
        setFuente("conector_espera.gif");
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
      <View style= {styles.lineaHorizontal}>
        
        <Image  style= {styles.avatar} source={Images.fuentes[fuente]}/>

      </View>
      
      <StatusBar style="auto" />
      {/*<TextInput 
        style= {styles.entrada}
        placeholder= "Introduzca texto"
      />*/}  
      
      {!started ? <Button disabled ={desabilitarBoton} title='Presione para traducir' color= "green" onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Presione para dejar de hablar' color= "blue" onPress={stopSpeechToText} /> : undefined}
  
      {fuente!="conector_espera.gif" && fuente!="cargando.gif"?<Text style= {styles.salidaActual}>{"Iris está diciendo: "+fuente}</Text>: undefined}


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
  },
  salidaActual:{
    fontSize:20,
    padding: 7,
    fontWeight: 'bold',
    color: 'blue',
  },
});
// uso este comando para correr el demo de la aplicación eas build -p android --profile preview