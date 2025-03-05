import { Router } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();
const authService = new AuthService(process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai');

router.get('/test', async(req, res, next)=>{
    try{
        res.json({message : 'test working'})
    } catch (err){
        next(err)
    }
});

router.post('/signup', async (req, res, next) => {
    try {
        const user = await authService.signup(req.body);
        res.json(user);
    } catch (err) {
        next(err)
    }
});

router.post('/login', async (req, res, next) => {
    try {
        await authService.login(req.body);
        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        next(error);
    }
});

router.post('/verify-otp', async (req, res, next) => {
    try {
        const token = await authService.verifyOTP(req.body);
        res.json(token);
    } catch (error) {
        next(error);
    }
});

router.post('/forgot-password', async (req, res, next) => {
    try {
        await authService.forgotPassword(req.body);
        res.json({ message: 'Password reset instructions sent to email' });
    } catch (error) {
        next(error);
    }
});

router.post('/reset-password', async (req, res, next) => {
    try {
        await authService.resetPassword(req.body);
        res.json({ message: 'Password successfully reset' });
    } catch (error) {
        next(error);
    }
});

export default router;