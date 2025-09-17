import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import { COLORS } from "../../constants/colors";

const { width, height } = Dimensions.get("window");

const scaleFont = (size) => size * (width / 375); // 375 is base iPhone width
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(scaleFont(size)));

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: width * 0.05, 
    justifyContent: "center",
  },
  illustration: {
    width: width * 0.8, 
    height: height * 0.35, 
    resizeMode: "contain",
  },
  title: {
    fontSize: normalize(24),
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: height * 0.02,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: normalize(16),
    color: COLORS.text,
  },
  errorInput: {
    borderColor: COLORS.expense,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: width * 0.045,
    alignItems: "center",
    marginTop: height * 0.015,
    marginBottom: height * 0.025,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: normalize(16),
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: width * 0.02,
  },
  footerText: {
    color: COLORS.text,
    fontSize: normalize(14),
  },
  linkText: {
    color: COLORS.primary,
    fontSize: normalize(14),
    fontWeight: "600",
  },
  verificationContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  verificationTitle: {
    fontSize: normalize(20),
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: height * 0.025,
    textAlign: "center",
  },
  verificationInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: normalize(16),
    color: COLORS.text,
    width: "100%",
    textAlign: "center",
    letterSpacing: 2,
  },

  errorBox: {
    backgroundColor: "#FFE5E5",
    padding: width * 0.03,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.expense,
    marginBottom: height * 0.02,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: COLORS.text,
    marginLeft: width * 0.02,
    flex: 1,
    fontSize: normalize(13),
  },
});
