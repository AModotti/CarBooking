/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 *
 * @author AModotti
 */
public class InsertBooking extends HttpServlet {

	private static final long serialVersionUID = 1L;

	/**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        
        PrintWriter out = response.getWriter();
        
        try {
            
            Connection conn = null;
            PreparedStatement ps = null;
            ResultSet rs = null;
            
            JSONObject record = new JSONObject();
            
            String ip = request.getRemoteAddr();
              
            String daorario = null;
            String aorario = null;
            int days = 0;
            
            Calendar c = Calendar.getInstance();
            
            String nome = request.getParameter("nome").trim().toUpperCase();
            String cognome = request.getParameter("cognome").trim().toUpperCase();
            String destinazione = request.getParameter("destinazione").trim().toUpperCase();
            String motivo = request.getParameter("motivo").trim().toUpperCase();
            String dagiorno = request.getParameter("dagiorno").trim();
            String agiorno = request.getParameter("agiorno").trim();
            String tuttoilgiorno = request.getParameter("tuttoilgiorno");
            
            SimpleDateFormat myFormat = new SimpleDateFormat("dd/MM/yyyy");
            
            try {
	            Date date1 = myFormat.parse(dagiorno);
	            Date date2 = myFormat.parse(agiorno);
	            long diff = date2.getTime() - date1.getTime();
	            days = (int) TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
            } catch(ParseException e) {

            } 
	            
	            
            if(tuttoilgiorno.equals("1")){
                daorario = "00:00";
                aorario = "24:00";
            }else{
                daorario = request.getParameter("daorario");
                aorario = request.getParameter("aorario");
            }
            
            String veicolo = request.getParameter("veicolo");
            
            int nomeveicolochar = veicolo.indexOf("-")-1;
            
            String targaveicolo = veicolo.substring(nomeveicolochar+3,nomeveicolochar+10);

            String sql = "INSERT INTO F0003 "
                       + "           (ID,"
                       + "            PLATE,"
                       + "            NAME,"
                       + "            SURNAME,"
                       + "            DESTINATION,"
                       + "            REASON,"
                       + "            RESERVATIONDATE,"
                       + "            DAY,"
                       + "            MONTH,"
                       + "            YEAR,"
                       + "            WEEK,"
                       + "            STARTTIME,"
                       + "            ENDTIME,"
                       + "            STATE,"
                       + "            DELETED,"
                       + "            INSERTUSER,"
                       + "            INSERTDATE,"
                       + "            UPDATEUSER,"
                       + "            UPDATEDATE,"
                       + "            DELETEUSER,"
                       + "            DELETEDATE,"
                       + "            KMTOTAL) "
                       + "    VALUES (F0003_SEQ.NEXTVAL,"                               //ID
                       + "            ?,"                                               //PLATE
                       + "            ?,"                                               //NAME
                       + "            ?,"                                               //SURNAME
                       + "            ?,"                                               //DESTINATION
                       + "            ?,"                                               //REASON
                       + "            TO_DATE(?,'DD/MM/YYYY'),"                          //RESERVATIONDATE
                       + "            TO_CHAR(TO_DATE(?,'DD/MM/YYYY'),'DD'),"           //DAY
                       + "            TO_CHAR(TO_DATE(?,'DD/MM/YYYY'),'MM'),"           //MONTH
                       + "            TO_CHAR(TO_DATE(?,'DD/MM/YYYY'),'YYYY'),"         //YEAR
                       + "            TO_CHAR(TO_DATE(?,'DD/MM/YYYY'),'IW'),"           //WEEK 
                       + "            ?,"                                               //STARTTIME
                       + "            ?,"                                               //ENDTIME
                       + "            ?,"                                               //STATE
                       + "            ?,"                                               //DELETED
                       + "            ?,"                                               //INSERTUSER
                       + "            TO_CHAR(SYSDATE,'DD/MM/YYYY HH24:MI:SS'),"        //INSERTDATE
                       + "            ?,"                                               //UPDATEUSER
                       + "            ?,"                                               //UPDATEDATE
                       + "            ?,"                                               //DELETEUSER
                       + "            ?,"                                               //DELETEDATE
                       + "            ?)";                                              //KMTOTAL
            
            try{

                Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
                conn = DriverManager.getConnection(Parameters.dbconnectionstring,Parameters.dbusername,Parameters.dbpassword);

                ps = conn.prepareStatement(sql);

                for(int i=0;i<=days;i++){
                	
                	c.setTime(myFormat.parse(dagiorno));
                	c.add(Calendar.DATE, i);
                	                	
	                ps.setString(1, targaveicolo);
	                ps.setString(2, nome);
	                ps.setString(3, cognome);
	                ps.setString(4, destinazione);
	                ps.setString(5, motivo);
	                ps.setString(6, myFormat.format(c.getTime()));
	                ps.setString(7, myFormat.format(c.getTime()));
	                ps.setString(8, myFormat.format(c.getTime()));
	                ps.setString(9, myFormat.format(c.getTime()));
	                ps.setString(10, myFormat.format(c.getTime()));
	                ps.setString(11, daorario);
	                ps.setString(12, aorario);
	                ps.setString(13, "PRENOTATO");
	                ps.setString(14, "0");
	                ps.setString(15, ip);
	                ps.setString(16, " ");
	                ps.setString(17, " ");
	                ps.setString(18, " ");
	                ps.setString(19, " ");
	                ps.setString(20, "0");
	                 
	                rs = ps.executeQuery();
                }   
                
                rs.close();
                ps.close();
                
                record.put("message", "Prenotazione veicolo avvenuta con successo.");
                
                out.println(record);
                
            }catch(Exception Ex) {

                out.print(Ex.getMessage());

            }finally{

                if (ps != null) {
                    try {
                        ps.close();
                    } catch (SQLException e) {
                        System.out.println(e.getMessage());
                    }
                }

                if (conn != null) {
                    try {
                        conn.close();
                    } catch (SQLException e) {
                        System.out.println(e.getMessage());
                    }
                }

            }
        } finally { 
            out.close();
        }
            
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
