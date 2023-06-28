import sgMail, { MailDataRequired} from '@sendgrid/mail';
import config from '../config';
import { IUser } from '../models/userModel';

sgMail.setApiKey(config.SENDGRID_API);

const sendEmail = async (email:string, data:any, templateId:string): Promise<void> => {
    const msg: MailDataRequired = {
        to: email,
        from: config.EMAIL_SENDGRID,
        templateId,
        dynamicTemplateData: {
            data
        }
      };
    await sgMail.send(msg)
      .then(() => {console.log('enviado')}, error => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body)
        }
      });
};

export const sendValidationAccountMail  = async (email:string, user:IUser): Promise<void> => {
    const templateId = 'd-e4ef0ac568cc434cb775c679090c761b'
    sendEmail(email, user, templateId);
}

export const sendResetPasswordEmail = async (email:string, user: IUser): Promise<void> => {
    const templateId = 'd-4d3d3c4157814684b974b3bc2774b32b'
    sendEmail(email, user, templateId);
}