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
public class UpdateSelectedVehicle extends HttpServlet {

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
            
            String id = request.getParameter("id"); 
            String azienda = request.getParameter("azienda").toUpperCase();
            String veicolo = request.getParameter("veicolo").toUpperCase();
            String targa = request.getParameter("targa").toUpperCase();
            String stato = request.getParameter("stato").toUpperCase();
            String sito = request.getParameter("sito").toUpperCase();
            String telepass = request.getParameter("telepass").toUpperCase();
            String viacard = request.getParameter("viacard").toUpperCase();
            String cartacarburante = request.getParameter("cartacarburante").toUpperCase();
            
            if(telepass.equals("")){
            	telepass = " ";
            }
            if(viacard.equals("")){
            	viacard = " ";
            }
            if(cartacarburante.equals("")){
            	cartacarburante = " ";
            }
            
            String sql = "UPDATE F0002 "
                       + "   SET COMPANY = ?,"
                       + "       TYPE = ?,"
                       + "       PLATE = ?,"
                       + "       ENABLED = ?,"
                       + "       SITE = ?,"
                       + "       TELEPASS = ?,"
                       + "       VIACARD = ?,"
                       + "       FUELCARD = ? "
                       + " WHERE ID = ? ";   

            try{

                Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
                conn = DriverManager.getConnection(Parameters.dbconnectionstring,Parameters.dbusername,Parameters.dbpassword);

                ps = conn.prepareStatement(sql);
                
                ps.setString(1, azienda);
                ps.setString(2, veicolo);
                ps.setString(3, targa);
                ps.setString(4, stato);
                ps.setString(5, sito);
                ps.setString(6, telepass);
                ps.setString(7, viacard);
                ps.setString(8, cartacarburante);
                ps.setString(9, id);
                 
                rs = ps.executeQuery();
                
                rs.close();
                ps.close();
                
                record.put("message", "Modifica eseguita con successo.");
                                
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
