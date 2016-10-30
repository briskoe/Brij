package ca.brij.controller;


import java.io.IOException;
import java.security.Principal;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ca.brij.bean.user.User;
import ca.brij.bean.user.UserRole;
import ca.brij.utils.DaoHelper;

@Controller
public class PortalController {
	
	@Autowired
	public DaoHelper daoHelper;
	
	@RequestMapping("/homePage")
	public ModelAndView goToHome(Model model, Principal principal) throws IOException{
		
		User currentUser = daoHelper.getUserDao().findByUserName(principal.getName());
		String portal = "portal.html";
		Set<UserRole> roles = currentUser.getUserRole();
		for(UserRole role : roles){
			if(role.getRole().equals(UserRole.ADMIN)){
				portal = "/admin/adminConsole.html";
			}
		}
		ModelAndView mv = new ModelAndView(portal);
		return mv;
	}
	

	/**
	 * FOR ADMIN
	 */
	
	@RequestMapping("/admin/userPage")
	public ModelAndView goToUsers(Model model) throws IOException{
		ModelAndView mv = new ModelAndView("/admin/usersPage.html");
		return mv;
	}
	
	@RequestMapping("/admin/postPage")
	public ModelAndView goToPosts(Model model) throws IOException{
		ModelAndView mv = new ModelAndView("/admin/postsPage.html");
		return mv;
	}
	
	@RequestMapping("/admin/servicePage")
	public ModelAndView goToServices(Model model) throws IOException{
		ModelAndView mv = new ModelAndView("/admin/servicesPage.html");
		return mv;
	}

}
