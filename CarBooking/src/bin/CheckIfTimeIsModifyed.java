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
public class CheckIfTimeIsModifyed extends HttpServlet {

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
            
            String modifica = null;
            
            JSONObject record = new JSONObject();
            
            String daorario = null;
            String aorario = null;
            String recdaorario = null;
            String recaorario = null;
            String recgiorno = null;
            String rectargaveicolo = null;
            int daorariominuti = 0;
            int aorariominuti = 0;
            int recdaorariominuti = 0;
            int recaorariominuti = 0;
            
            String numero = request.getParameter("numero");
            String giorno = request.getParameter("giorno");
            
            String veicolo = request.getParameter("veicolo");
            
            int nomeveicolochar = veicolo.indexOf("-")-1;
            
            //String nomeveicolo = veicolo.substring(0,nomeveicolochar);
            String targaveicolo = veicolo.substring(nomeveicolochar+3,nomeveicolochar+10);
            
            String tuttoilgiorno = request.getParameter("tuttoilgiorno");
            
            if(tuttoilgiorno.equals("1")){
                daorario = "0";
                aorario = "1440";
            }else{
                daorario = request.getParameter("daorario");
                aorario = request.getParameter("aorario");
                
                daorariominuti = (Integer.parseInt(daorario.substring(0,2))*60)+(Integer.parseInt(daorario.substring(3,5)));
                aorariominuti = (Integer.parseInt(aorario.substring(0,2))*60)+(Integer.parseInt(aorario.substring(3,5)));
            }

            String sql = "SELECT STARTTIME,"
                       + "       ENDTIME,"
                       + "       TO_CHAR(RESERVATIONDATE,'DD/MM/YYYY'),"
                       + "       PLATE "
                       + "  FROM F0003 "
                       + " WHERE ID = ? "
                       + "   AND DELETED = '0'";

            try{

                Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
                conn = DriverManager.getConnection(Parameters.dbconnectionstring,Parameters.dbusername,Parameters.dbpassword);

                ps = conn.prepareStatement(sql);

                ps.setString(1, numero);
                 
                rs = ps.executeQuery();
                
                while (rs.next()){
                    
                    recdaorario = rs.getString(1);
                    recaorario =  rs.getString(2);
                    recgiorno =  rs.getString(3).trim();
                    rectargaveicolo =  rs.getString(4).trim();
                    recdaorariominuti = (Integer.parseInt(recdaorario.substring(0,2))*60)+(Integer.parseInt(recdaorario.substring(3,5)));
                    recaorariominuti = (Integer.parseInt(recaorario.substring(0,2))*60)+(Integer.parseInt(recaorario.substring(3,5)));
                    
                    if ((daorariominuti == recdaorariominuti)&&
                        (aorariominuti == recaorariominuti)  &&
                        (giorno.equals(recgiorno))           &&
                        (targaveicolo.equals(rectargaveicolo))){
                        
                        modifica = "0";
                        
                    }else{
                    
                        modifica = "1";
                    }    
                    
                }
                               
                rs.close();
                ps.close();
                               
                record.put("message", modifica);

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
