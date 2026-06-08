export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>🐧 Waddle, Inc.</strong> — Built on ice in Antarctica & the cloud.
        </div>
        <div>© {new Date().getFullYear()} Waddle, Inc. All fish reserved.</div>
      </div>
    </footer>
  );
}
