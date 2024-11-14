package email

import (
	"fmt"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

func SendGridEmailVerify(verificationCode string, userEmail string) error {

	from := mail.NewEmail("Ben", os.Getenv("SENDGRID_SENDER_EMAIL"))
	subject := "Email Verification Code"
	to := mail.NewEmail("", userEmail)
	plainTextContent := "Verify your email before creating your account."
	htmlContent := fmt.Sprintf(`
<table width="100%%" bgcolor="#005838" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" bgcolor="#F1F1F1" style="margin: 1%% 5%%; padding: 10px 15px;">
                <tr>
                    <td align="center" style="padding: 10px; background-color: #0A2E36;">
                        <img style="border-radius: 30px;" src="https://imgur.com/Hac1RUF.png" width="55" height="50" alt="South Balance Logo">
                    </td>
                </tr>
                <tr>
                    <td align="center" style="font-size: 24px; font-weight: bold; padding: 10px;">
                        South Balance Email Verification
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-size: 16px; color: #333; text-align: center;">
                        This is an email indicating that you have received a verification code to confirm your email. Below is the verification code, which is valid for 2 minutes.
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 10px; font-size: 24px; color: #333; font-weight: bold;">
                        <span>%s</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-size: 14px; color: #333;">
                        <ol>
                            <li>Enter the above verification code into the input box on the South Balance Website to verify your email.</li>
                            <li>Click the "submit verification" button or press "enter" to confirm the code.</li>
                            <li>If the code is correct, you're in!</li>
                        </ol>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 20px; font-size: 12px; color: #666;">
                        South Balance Inc. © All Rights Reserved.
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`, verificationCode)
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
	return err
}
