<!DOCTYPE html>
<html>
<head>
  <title>シューティングゲーム</title>
  <h1>ウサギを倒せ</h1>
  <link href="shooting.css" rel="stylesheet" type="text/css">
  <style>
    body { text-align: center; }
    canvas { background-color: #f0f0f0; }
  </style>
</head>
<body>
  <canvas id="gameCanvas" width="580" height="700"></canvas>
  <script src="javascript.js"></script>
  <br><br/>
  <table>
<tr>
<td><form action="Shooting.php" method="get" >
  <input type="submit" value="リトライ" >
  </form>
</td>
<td><form action="start.php" method="get" >
  <input type="submit"  value="もどる" >
  </form>
</td>
</tr>
</table>
</body>
</html>