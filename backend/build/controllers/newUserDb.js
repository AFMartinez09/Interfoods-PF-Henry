"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const userServices_1 = require("../services/userServices"); // Asegúrate de que la ruta es correcta
const nodemailer_1 = require("../config/nodemailer");
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUser = yield (0, userServices_1.createUser)(req.body);
        // Envía correo electrónico al registrarse
        yield nodemailer_1.transporter.sendMail({
            from: process.env.EMAIL_INTERFOOD,
            to: `${createdUser.email}`,
            subject: "¡Bienvenido a InterFood!",
            html: `<div dir="ltr" class="es-wrapper-color">
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
     <tr>
      <td class="esd-email-paddings" valign="top">
       <table cellpadding="0" cellspacing="0" class="es-footer esd-header-popover" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe" align="center">
           <table bgcolor="#bcb8b1" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600">
            <tbody>
             <tr>
              <td class="esd-structure es-p20t es-p20b es-p40r es-p40l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="520" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://interfoods.netlify.app"><img src="https://ficsctu.stripocdn.email/content/guids/CABINET_4ebd4a0c11f0f88e99f5549c5c52b03b55fb2133d3d553bd492d3a2937770924/images/interfood.jpg" alt="Logo" style="display:block" height="80" title="Logo" class="adapt-img"></a></td>
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
           <table bgcolor="#efefef" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="border-radius: 20px 20px 0 0 ">
            <tbody>
             <tr>
              <td class="esd-structure es-p40t es-p40r es-p40l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="520" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="left" class="esd-block-image es-m-txt-c" style="font-size: 0px;"><a target="_blank"><img src="https://ficsctu.stripocdn.email/content/guids/CABINET_ee77850a5a9f3068d9355050e69c76d26d58c3ea2927fa145f0d7a894e624758/images/group_4076323.png" alt="Confirm email" style="display: block; border-radius: 100px;" width="100" title="Confirm email"></a></td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
             <tr>
              <td class="es-p20t es-p40r es-p40l esd-structure" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="520" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fafafa" style="background-color: #fafafa; border-radius: 10px; border-collapse: separate;">
                    <tbody>
                     <tr>
                      <td align="left" class="esd-block-text es-p20"><h3>Bienvenido, ${createdUser.nombre}</h3><p><br></p><p>¡Bienvenido a InterFood! Estamos encantados de que te hayas unido a nuestra pagina.<br><br>Tu cuenta ha sido creada exitosamente. A continuación, encontrarás los detalles de tu perfil:<br>- Nombre: ${createdUser.nombre}</p><br><p>- Apellido: ${createdUser.apellido}</p><br><p>- Apellido: ${createdUser.email}</p><br><p>- País: ${createdUser.pais}</p><br><p>- Ciudad: ${createdUser.ciudad}</p><br><p>- Dirección: ${createdUser.direccion}.<br>¡Gracias por registrarte en InterFood y formar parte de nuestra familia! Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.</p></td>
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
           <table bgcolor="#efefef" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
            <tbody>
             <tr>
              <td class="esd-structure es-p30t es-p40b es-p40r es-p40l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="520" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="center" class="esd-block-button">
                     <!--[if mso]><a href="https://interfoods.netlify.app" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://interfoods.netlify.app" 
                style="height:56px; v-text-anchor:middle; width:520px" arcsize="50%" stroke="f"  fillcolor="#325024">
		<w:anchorlock></w:anchorlock>
		<center style='color:#ffffff; font-family:Imprima, Arial, sans-serif; font-size:22px; font-weight:700; line-height:22px;  mso-text-raise:1px'>Ir a Interfood</center>
	</v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="es-button-border" style="display:block;background:#325024"><a href="https://interfoods.netlify.app" class="es-button msohide" target="_blank" style="padding-left:5px;padding-right:5px;display:block;background:#325024;border-color:#7630f3;mso-border-alt:10px solid #325024">Ir a Interfood</a></span><!--<![endif]-->
                       </td>
                     </tr>
                    </tbody>
                   </table></td>
                 </tr>
                </tbody>
               </table></td>
             </tr>
             <tr>
              <td class="esd-structure es-p40r es-p40l" align="left">
               <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                 <tr>
                  <td width="520" class="esd-container-frame" align="center" valign="top">
                   <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                     <tr>
                      <td align="left" class="esd-block-text"><p>¡Que tengas un excelente día!<br>Atentamente,El equipo de InterFood,</p></td>
                     </tr>
                     <tr>
                      <td align="center" class="esd-block-spacer es-p40t es-p20b" style="font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td style="border-bottom: 1px solid #666666; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
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
           </table></td>
         </tr>
        </tbody>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center">
        <tbody>
         <tr>
          <td class="esd-stripe" align="center">
           <table bgcolor="#efefef" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="border-radius: 0 0 20px 20px">
            <tbody>
             <tr>
              <td class="esd-structure es-p20t es-p20b es-p40r es-p40l esdev-adapt-off" align="left">
               <table width="520" cellpadding="0" cellspacing="0" class="esdev-mso-table">
                <tbody>
                 <tr>
                  <td class="esdev-mso-td" valign="top">
                   <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                    <tbody>
                     <tr>
                      <td width="47" class="esd-container-frame" align="center" valign="top">
                       <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                         <tr>
                          <td align="center" class="esd-block-image es-m-txt-l" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img src="https://ficsctu.stripocdn.email/content/guids/CABINET_ee77850a5a9f3068d9355050e69c76d26d58c3ea2927fa145f0d7a894e624758/images/group_4076325.png" alt="Demo" style="display: block;" width="47" title="Demo"></a></td>
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
                      <td width="453" class="esd-container-frame" align="center" valign="top">
                       <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                         <tr>
                          <td align="left" class="esd-block-text"><p style="font-size: 16px;">Si tienes preguntas, estamos aquí para ayudarte.<br><a style="font-size:16px" target="_blank" href="mailto:">grupointerfoods@gmail.com</a></p></td>
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
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(500).json({ error: "error al crear usuario" });
    }
});
exports.newUser = newUser;
