import React from 'react';

export default class Modal extends React.Component {
  render() {
    return (
    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">Redux-OS</h4>
          </div>
          <div className="modal-body">
            Bienvendio a Redux-OS!<br/><br/>

            Nota: Puedes editar los valores en vivo. Los procesos que intentan entrar a una lista llena se envian a error<br/><br/>

            Los botones de play, pausa y stop hacen lo que esperas.<br/><br/>

            Clock Speed:<br/>
            Slow cambia a un tick cada dos segundos, Normal un tick por segundo y Fast dos ticks por segundo<br/><br/>

            Spawn probability:<br/>
            numero entre 0-100 inclusivo que determina la probabilidad que se cree<br/><br/>

            Quantum:<br/>
            Solo funciona en round robin, tiene que ser mayor a cero<br/><br/>

            IO Time:<br/>
            tiempo de uso de IO, el proceso cuando entra a using toma este valor<br/><br/>

            Process duration average:<br/>
            el tiempo de un nuevo proceso sera +- 25% de este numero mayor a cero<br/><br/>

            Algorithm:<br/>
            Selector de algoritmos, rr o fcfs<br/><br/>

            List limits:<br/>
            Tamaño de las listas de hold, ready y waiting<br/><br/>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
