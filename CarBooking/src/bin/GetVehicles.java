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
public class GetVehicles extends HttpServlet {

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

            JSONObject veicoli = new JSONObject();
                        
            try{

                Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
                conn = DriverManager.getConnection(Parameters.dbconnectionstring,Parameters.dbusername,Parameters.dbpassword);

                String sql = "SELECT ID,"
                		   + "       COMPANY,"
                           + "       TYPE,"
                           + "       PLATE,"
                           + "       SITE,"
                           + "       ENABLED,"
                           + "       TELEPASS,"
                           + "       VIACARD,"
                           + "       FUELCARD "
                           + "  FROM F0002 "
                           + " WHERE DELETED = '0' "
                           + " ORDER BY TYPE,PLATE";   
                
                ps = conn.prepareStatement(sql);
                 
                rs = ps.executeQuery();

                while (rs.next()){
                    
                    empty = false;
                    JSONObject veicolo = new JSONObject();
                    
                    veicolo.put("id", rs.getString(1));
                    veicolo.put("azienda", rs.getString(2).trim());
                    veicolo.put("veicolo", rs.getString(3).trim());
                    veicolo.put("targa", rs.getString(4).trim());
                    veicolo.put("sito", rs.getString(5).trim());
                    veicolo.put("stato", rs.getString(6).trim());
                    veicolo.put("telepass", rs.getString(7).trim());
                    veicolo.put("viacard", rs.getString(8).trim());
                    veicolo.put("catacarburanti", rs.getString(9).trim());
                    veicoli.append("veicolo",veicolo);
                    
                }
                
                if(empty){
                    
                    veicoli.put("veicolo", "");
                    
                }
                
                rs.close();
                ps.close();
                
                out.println(veicoli);
                
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
