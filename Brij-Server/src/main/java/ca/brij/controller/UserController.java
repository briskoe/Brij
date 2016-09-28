package ca.brij.controller;

import java.security.Principal;
import java.util.ArrayList;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca.brij.bean.user.MyUserDetailsService;
import ca.brij.bean.user.User;
import ca.brij.bean.user.UserRole;
import ca.brij.dao.user.UserDao;
import ca.brij.utils.MergeBeanUtil;


@RestController
public class UserController {

	
	@RequestMapping(value = "/user/register", method = RequestMethod.POST)
	@ResponseBody
	public String register(@RequestBody User userEntity) {
		userEntity.setEnabled(true);
		String encryptedPassword = new BCryptPasswordEncoder().encode(userEntity.getPassword());
		userEntity.setPassword(encryptedPassword);
		UserRole userRole = new UserRole(userEntity, "ROLE_USER");
		userEntity.getUserRole().add(userRole);
		User savedUser = userDao.save(userEntity);
		UserDetails userDetails = userDetailsService.loadUserByUsername(userEntity.getUsername());
		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails,
				encryptedPassword, userDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		return "Success";

	}
	@RequestMapping(value = "/user/save", method = RequestMethod.POST)
	@ResponseBody
	public String updateUser(@RequestBody User updatedUser, Principal principal) {
		try {
			//password and enabled goes to null as we can't allow to be updated through this request
			updatedUser.setPassword(null);
			updatedUser.setEnabled(null);
			updatedUser.setUserRole(null);
			User originalUser = userDao.findByUserName(principal.getName());
			MergeBeanUtil.copyNonNullProperties(updatedUser,originalUser );
			userDao.save(originalUser);
		} catch (Exception ex) {
			return "Error updating the user: " + ex.toString();
		}
		return "Success";
	}

	/**
	 * GET /delete --> Delete the user having the passed id.
	 */
	@RequestMapping(value = "/admin/user/delete", method = RequestMethod.DELETE)
	@ResponseBody
	public String delete(String username) {
		try {
			User user = new User(username);
			userDao.delete(user);
		} catch (Exception ex) {
			return "Error deleting the user:" + ex.toString();
		}
		return "Success";
	}
	
	@RequestMapping("/user/current")
	@ResponseBody
	public User getCurrentUser(Principal principal) {
		User user = null;
		try {
			user = userDao.findByUserName(principal.getName());
		} catch (Exception ex) {
			return null;
		}
		return user;
	}

	/**
	 * TODO work in making it get any parameter.
	 */
	@RequestMapping("/user/getBy")
	@ResponseBody
	public String getByEmail(String email) {
		String userId = "";
		try {
			User user = userDao.findsomething(email);
			userId = String.valueOf(user.getUsername());
		} catch (Exception ex) {
			return "User not found" + ex.toString();
		}
		return "The user id is: " + userId;
	}

	/**
	 * Get all the users in the db
	 */
	@RequestMapping(value = "/admin/user/findAll", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<User> getAllUser() {
		ArrayList<User> users;
		try {
			users = userDao.findAll();
		} catch (Exception ex) {
			return null;
		}
		return users;
	}
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private MyUserDetailsService userDetailsService;
	final static Logger logger = Logger.getLogger(UserController.class);

}
