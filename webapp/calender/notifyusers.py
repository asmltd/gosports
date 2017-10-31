#!/usr/bin/python
import MySQLdb
import time
import smtplib
import re
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
def trigger_email():
    # Login into mail server
    fromaddr = "gosportsmanagement@gmail.com"
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(fromaddr, "g05ports")
    date_today = time.strftime("%Y-%m-%d")
    print str(date_today)

    db = MySQLdb.connect("localhost","gosports","g05ports","gosports" )
    cursor = db.cursor()
    listuserssql = "select user_id_id from gosports.calender_calendar where event_date_time  like '%s' group by user_id_id" % ("%"+date_today+"%")

    try:
        cursor.execute(listuserssql)
        users = cursor.fetchall()
        for user in users:

            calendareventsql = "select * from gosports.calender_calendar where event_date_time  like '%s' and user_id_id ='%d'" % ("%"+date_today+"%", user[0])
            cursor.execute(calendareventsql)
            rows = cursor.fetchall()
            table_row = ""
            for row in rows:
                event = row[1]
                user_id_id = row[3]
                event_date_time = row[4]
                print "event name ==> " + str(event)
                print "user-id ==> " + str(user_id_id)
                print "event date time ==> " + str(event_date_time )

                # Retrieve Firstname and Mail id for the user
                mail_id_sql = "select first_name, email from gosports.ui_user_details where id='%d'" % (user_id_id)
                cursor.execute(mail_id_sql)
                results1 = cursor.fetchall()
                name = results1[0][0]
                mail_id = results1[0][1]
                print "mail id retrieved is " + str(mail_id)
                retrievedate = re.split("(\d+-\d+-\d+) (\d+:\d+:\d+)", str(event_date_time))
                print "printing event time " + retrievedate[2]
                print "---------------------------------------------"
                table_row = table_row + "<TR ALIGN=\"CENTER\"><TD>"+str(event)+ "</TD><TD>"+retrievedate[2]+ "</TD></TR>"

            # Sending Mail
            toaddr = str(mail_id)
            msg = MIMEMultipart()
            msg['From'] = 'gosportsmanagement@gmail.com'
            msg['To'] = toaddr
            msg['Subject'] = str(event)+" Event Reminder"
            body = """\
            <h3>Hi """+name+ """,<h3>
            <h4> Here are the list of Events you have for today<h4>
            <TABLE BORDER="5"    WIDTH="50%"   CELLPADDING="4" CELLSPACING="3">
                <TR>
                    <TH COLSPAN="2"><H2>EVENT LIST</H2>
                    </TH>
                </TR>
               """+ table_row +"""
            </TABLE>
            Have a Nice day
            <h4>Thanks,<h4>
            <h4>GoSports Team<h4>
            <a href = "https://gosports-asm01.herokuapp.com" >https://gosports-asm01.herokuapp.com</a><br>
            <img src = "https://raw.githubusercontent.com/asmltd/gosports/master/gosports_logo.png">
            """
            msg.attach(MIMEText(body, 'html'))
            text = msg.as_string()
            server.sendmail(fromaddr, toaddr, text)


    except:
          print "Error: unable to fecth data"

    #disconnect from smtp server
    server.quit()
    # disconnect from server
    db.close()
    exit