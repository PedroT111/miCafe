import sgMail, { type MailDataRequired } from '@sendgrid/mail';
import config from '../config';
import { type IUser } from '../models/userModel';
import { type IProduct } from '../models/productModel';

sgMail.setApiKey(config.SENDGRID_API);

const sendEmail = async (
  email: string,
  data: any,
  templateId: string
): Promise<void> => {
  const msg: MailDataRequired = {
    to: email,
    from: config.EMAIL_SENDGRID,
    templateId,
    dynamicTemplateData: {
      data
    }
  };
  await sgMail.send(msg).then(
    () => {

    },
    (error) => {
      console.error(error);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (error.response) {
        //console.error(error.response.body);
      }
    }
  );
};

export const sendValidationAccountMail = async (user: IUser): Promise<void> => {
  const templateId = 'd-e4ef0ac568cc434cb775c679090c761b';
  await sendEmail(user.email, user, templateId);
};

export const sendResetPasswordEmail = async (user: IUser): Promise<void> => {
  const templateId = 'd-4d3d3c4157814684b974b3bc2774b32b';
  await sendEmail(user.email, user, templateId);
};

export const sendDataEmail = async (
  userList: IUser[],
  data: any,
  templateId: string
): Promise<void> => {
  console.log(userList, data)
  const promises = userList.map(async (user) => {
    await sendEmail(user.email, { user, data }, templateId);
  });
  await Promise.all(promises);
};


