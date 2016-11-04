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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 *
 * @author AModotti
 */
public class GetWeekBooking extends HttpServlet {

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
            
            Boolean empty = true;

            JSONObject prenotazioni = new JSONObject();
            
            String giorno = request.getParameter("giorno");
            
            String sql = "SELECT A.ID,"
                       + "       A.WEEK,"
                       + "       A.DAY,"
                       + "       TO_CHAR(A.RESERVATIONDATE,'DD/MM/YYYY'),"
                       + "       B.TYPE,"
                       + "       A.PLATE,"
                       + "       A.NAME,"
                       + "       A.SURNAME,"
                       + "       A.DESTINATION,"
                       + "       A.REASON,"
                       + "       A.STARTTIME,"
                       + "       A.ENDTIME "
                       + "  FROM F0003 A"
                       + "  LEFT JOIN F0002 B ON (A.PLATE = B.PLATE) "
                       + " WHERE A.DELETED = '0' "
                       + "   AND A.WEEK = TO_CHAR(TO_DATE(?,'DD/MM/YYYY'),'IW') " 
                       + " ORDER BY A.RESERVATIONDATE,A.PLATE,A.STARTTIME,A.ENDTIME";
            
            try{

                Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
                conn = DriverManager.getConnection(Parameters.dbconnectionstring,Parameters.dbusername,Parameters.dbpassword);

                ps = conn.prepareStatement(sql);

                ps.setString(1, giorno);
                 
                rs = ps.executeQuery();

                while (rs.next()){
                    
                    empty = false;
                    JSONObject prenotazione = new JSONObject();
                    
                    prenotazione.put("id", rs.getString(1));
                    prenotazione.put("settimana", rs.getString(2));
                    prenotazione.put("giorno", rs.getString(3));
                    prenotazione.put("data", rs.getString(4));
                    prenotazione.put("veicolo", rs.getString(5).trim());
                    prenotazione.put("targa", rs.getString(6).trim());
                    prenotazione.put("nome", rs.getString(7).trim());
                    prenotazione.put("cognome", rs.getString(8).trim());
                    prenotazione.put("destinazione", rs.getString(9).trim());
                    prenotazione.put("motivo", rs.getString(10).trim());
                    prenotazione.put("orainizio", rs.getString(11).trim());
                    prenotazione.put("orafine", rs.getString(12).trim());
                    prenotazioni.append("prenotazione",prenotazione);
                    
                }
                
                if(empty){
                    
                    prenotazioni.put("veicolo", "");
                    
                }
                
                rs.close();
                ps.close();
                
                out.println(prenotazioni);
                
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
