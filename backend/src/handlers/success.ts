import { Request, Response } from "express";
import { transporter } from "../config/nodemailer";

export const success = async (req: Request, res: Response) => {
  const {
    id,
    date_created,
    status,
    payment_id,
    payment_type,
    transaction_amount,
    description,
    user_email,
    user_name,
  } = req.body;
  try {
    let ventas = 0;
    console.log('entre a success');
    
    if (status === "approved") {
      ventas += 1;
      console.log(`El status del pago es: ${status}, ID: ${payment_id}, email: ${user_email}, nombre: ${user_name}, id: ${id}, total: ${transaction_amount}, fecha: ${date_created}`);
      // Envía correo electrónico al comprador
      await transporter.sendMail({
        from: process.env.EMAIL_INTERFOOD,
        to: `${user_email}, "grupointerfoods@gmail.com"`,
        subject: "Confirmación de compra en InterFood",
        html: `<div dir="ltr" class="es-wrapper-color">
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
     <tr>
      <td class="esd-email-paddings" valign="top">
       <table cellpadding="0" cellspacing="0" class="esd-header-popover es-header" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe" align="center">
           <table bgcolor="#172211" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color:#172211">
            <tbody>
             <tr>
              <td class="esd-structure es-p5b es-m-p0b" align="left">
               
               <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                <tbody>
                 <tr>
                  <td width="600" class="es-m-p0r esd-container-frame" valign="top" align="center">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-image es-m-txt-c" style="font-size: 0px;"><a target="_blank" href="https://interfoods.netlify.app"><img src="https://ficsctu.stripocdn.email/content/guids/CABINET_14775b95086252047cbfd0ebebb367278f1297fb29e992e71fc517f1cd5bca45/images/interfood.jpg" alt="Logo" style="display:block" title="Logo" class="adapt-img" width="140"></a></td>
                     </tr>
                    </tbody>
                   </table></td>
                  
                 </tr>
                </tbody>
               </table>

               </td>
             </tr>
            </tbody>
           </table></td>
         </tr>
        </tbody>
       </table>
       <table class="es-content" cellspacing="0" cellpadding="0" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe" align="center">
           <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
            <tbody>
             <tr>
              <td class="esd-structure" align="left">
               <table cellspacing="0" cellpadding="0" width="100%">
                <tbody>
                 <tr>
                      
                  <td class="es-m-p0r esd-container-frame" width="600" valign="top" align="center">
                      <table width="100%" cellspacing="0" cellpadding="0">
                          <tbody><tr>
            <td align="left" class="esd-block-text" bgcolor="#fff">
                <h1 style="color:#000;line-height:200% !important" align="center">Gracias por tu compra!.</h1>
            </td>
        </tr></tbody></table>
                  </td>
              
                      
              </tr>
                </tbody>
               </table></td>
             </tr>
             <tr>
              <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left" bgcolor="#fff" style="background-color:#fff">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="560" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-text es-p10 es-m-txt-c"><h3 style="color:#000">Hola ${user_name}, gracias por confiar en nosotros, a continuación se detalla tu compra</h3></td>
                     </tr>
                     
                     
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
            </tbody>
           </table></td>
         </tr>
        </tbody>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe" align="center">
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
            <tbody>
             <tr>
              <td class="esd-structure es-p40t es-p30b es-p20r es-p20l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="560" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-text"><h1>Resumen del pedido:<br>${description}</h1></td>
                     </tr>
                     <tr>
                      <td align="center" class="esd-block-text es-p40t es-p20r es-p20l es-m-p10t"><h3 class="b_title">ORDEN N°. ${payment_id}<br>${date_created}</h3></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>

             <tr>
              <td class="esd-structure es-p40t es-p30b es-p20r es-p20l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="560" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-text"><h1>Total</h1></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
             
             <tr>
              <td class="esd-structure es-p20r es-p20l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="560" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-spacer es-p5t es-p5b" style="font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td style="border-bottom:5px dotted #386641;background:unset;height:1px;width:100%;margin:0px"></td>
                         </tr>
                        </tbody>
                       </table></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
             <tr>
              <td class="esd-structure es-p20 esdev-adapt-off" align="left">
               <table width="560" cellpadding="0" cellspacing="0" class="esdev-mso-table">
                <tbody>
                 <tr>
                  <td class="esdev-mso-td" valign="top">
                   <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                    <tbody>
                     <tr>
                      <td width="270" class="esd-container-frame" align="left">
                       <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                         <tr>
                          <td align="left" class="esd-block-text es-m-txt-l"><h3>Total</h3></td>
                         </tr>
                        </tbody>
                       </table></td>
                     </tr>
                    </tbody>
                   </table></td>
                  <td width="20"></td>
                  <td class="esdev-mso-td" valign="top">
                   <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                    <tbody>
                     <tr>
                      <td width="270" align="left" class="esd-container-frame">
                       <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                         <tr>
                          <td align="right" class="esd-block-text es-m-txt-r"><h3>$${transaction_amount}</h3></td>
                         </tr>
                        </tbody>
                       </table></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>

             <tr>
              <td class="esd-structure es-p20" align="left">
               
               <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                <tbody>
                 <tr>
                  <td width="560" class="esd-container-frame" align="left">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="left" class="esd-block-text"><h3>Payment&nbsp;Method</h3><p>${payment_type}</p></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table>

               </td>
             </tr>
             
            </tbody>
           </table></td>
         </tr>
        </tbody>
       </table>
       
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe" align="center">
           <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600">
            <tbody>
             <tr>
              <td class="esd-structure" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="600" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-spacer es-p5t es-p5b" style="font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td style="border-bottom: 2px solid #eff7f6; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                         </tr>
                        </tbody>
                       </table></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
             <tr>
              <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left" bgcolor="#172211" style="background-color:#172211">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="560" align="left" class="esd-container-frame">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-image es-p20b es-m-txt-c" style="font-size: 0px;"><a target="_blank" href="https://interfoods.netlify.app"><img src="https://ficsctu.stripocdn.email/content/guids/CABINET_14775b95086252047cbfd0ebebb367278f1297fb29e992e71fc517f1cd5bca45/images/interfood.jpg" alt="Logo" style="display:block" title="Logo" height="100" class="adapt-img"></a></td>
                     </tr>

                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
            </tbody>
           </table></td>
         </tr>
        </tbody>
       </table>
       </td>
     </tr>
    </tbody>
   </table>
  </div>`,
      });

      res.status(200).send({
        message: "Pago Exitoso",
        id: id,
        date_created: date_created,
        payment_type_id: payment_type,
        status: status,
        description: description,
        transaction_amount: transaction_amount,
        ventas: ventas,
      });
    } else {
      console.log(`No pudimos aprobar el pago con ID ${payment_id}`);
    }
  } catch (error) {
    console.error("No pudimos aprobar el pago:", error);
    res.status(500).send(error);
  }
};
