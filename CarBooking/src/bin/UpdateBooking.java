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
public class UpdateBooking extends HttpServlet {

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
            
            String numero = request.getParameter("numero").trim().toUpperCase(); 
            String nome = request.getParameter("nome").trim().toUpperCase();
            String cognome = request.getParameter("cognome").trim().toUpperCase();
            String destinazione = request.getParameter("destinazione").trim().toUpperCase();
            String motivo = request.getParameter("motivo").trim().toUpperCase();
            String giorno = request.getParameter("giorno").trim().toUpperCase();
            String tuttoilgiorno = request.getParameter("tuttoilgiorno");
            
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
            
            String sql = "UPDATE F0003 "
                       + "   SET PLATE = ?,"
                       + "       NAME = ?,"
                       + "       SURNAME = ?,"
                       + "       DESTINATION = ?,"
                       + "       REASON = ?,"
                       + "       RESERVATIONDATE = TO_DATE(?,'DD/MM/YYYY'),"
                       + "       DAY = TO_CHAR(TO_DATE(?,'DD/MM/YYYY'),'DD'),"
                       + "       MONTH = TO_CHAR(TO_DATE(?,'DD/MM/YYYY'),'MM'),"
                       + "       YEAR = TO_CHAR(TO_DATE(?,'DD/MM/YYYY'),'YYYY'),"
                       + "       WEEK = TO_CHAR(TO_DATE(?,'DD/MM/YYYY'),'IW'),"
                       + "       STARTTIME = ?,"
                       + "       ENDTIME = ?,"
                       + "       UPDATEUSER = ?,"
                       + "       UPDATEDATE = TO_CHAR(SYSDATE,'DD/MM/YYYY HH24:MI:SS') "
                       + " WHERE ID = ? ";   

            try{

                Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
                conn = DriverManager.getConnection(Parameters.dbconnectionstring,Parameters.dbusername,Parameters.dbpassword);

                ps = conn.prepareStatement(sql);
                
                ps.setString(1, targaveicolo);
                ps.setString(2, nome);
                ps.setString(3, cognome);
                ps.setString(4, destinazione);
                ps.setString(5, motivo);
                ps.setString(6, giorno);
                ps.setString(7, giorno);
                ps.setString(8, giorno);
                ps.setString(9, giorno);
                ps.setString(10, giorno);
                ps.setString(11, daorario);
                ps.setString(12, aorario);
                ps.setString(13, ip);
                ps.setString(14, numero);
                 
                rs = ps.executeQuery();
                
                rs.close();
                ps.close();
                
                record.put("message", "Prenotazione modificata con successo.");
                                
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
